import { IsEmail, IsString, MinLength } from "class-validator";

export class RegisterDto {
  @IsEmail()
  email: string;

  @MinLength(8, { message: "Password cannot be less than 8 characters" })
  @IsString()
  password: string;

  @IsString()
  name: string;
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class RefreshTokenDto {
  @IsString({ message: "You did not pass refresh token or it is not a string" })
  refreshToken: string;
}
