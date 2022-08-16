import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { genSalt, hash, compare } from "bcryptjs";
import { UserService } from "../user/user.service";
import { LoginDto, RefreshTokenDto, RegisterDto } from "./auth.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly UserService: UserService,
    private readonly JwtService: JwtService
  ) {}
  async register(dto: RegisterDto) {
    const oldUser = await this.UserService.getByEmail(dto.email);
    if (oldUser)
      throw new BadRequestException(
        "User with this email is already in the system"
      );

    const salt = await genSalt(10);
    const hashedPassword = await hash(dto.password, salt);
    const user = await this.UserService.create({
      ...dto,
      password: hashedPassword,
    });

    const tokens = await this.issueTokenPair(String(user._id));

    return {
      user: this.removePassword(user),
      ...tokens,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.UserService.getByEmail(dto.email);
    if (!user)
      throw new BadRequestException(
        "User with this email does not exist in the system"
      );

    const isPasswordValid = await compare(dto.password, user.password);
    if (!isPasswordValid) throw new BadRequestException("Password is wrong");

    const tokens = await this.issueTokenPair(String(user._id));

    return {
      user: this.removePassword(user),
      ...tokens,
    };
  }

  private removePassword(user: any) {
    user.password = undefined;
    delete user.password;
    return user;
  }

  private async issueTokenPair(userId: string) {
    const data = { _id: userId };
    const refreshToken = await this.JwtService.signAsync(data, {
      expiresIn: "14d",
    });
    const accessToken = await this.JwtService.signAsync(data, {
      expiresIn: "1h",
    });

    return {
      refreshToken,
      accessToken,
    };
  }

  async genNewTokens({ refreshToken }: RefreshTokenDto) {
    if (!refreshToken) throw new UnauthorizedException("Please sign in");

    const result = await this.JwtService.verifyAsync(refreshToken);
    if (!result) throw new UnauthorizedException("Invalid token or expired");

    const user = await this.UserService.getById(result._id);

    const tokens = await this.issueTokenPair(String(user._id));
    return {
      user: this.removePassword(user),
      ...tokens,
    };
  }
}
