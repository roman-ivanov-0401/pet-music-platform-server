import { BadRequestException, Injectable } from "@nestjs/common";
import { genSalt, hash, compare } from "bcryptjs";
import { UserService } from "../user/user.service";
import { LoginDto, RegisterDto } from "./auth.dto";

@Injectable()
export class AuthService {
	constructor(private readonly UserService: UserService){}
	async register(dto: RegisterDto) {
		const oldUser = await this.UserService.getByEmail(dto.email)
		if (oldUser) throw new BadRequestException("User with this email is already in the system")
		
		const salt = await genSalt(10)
		const hashedPassword = await hash(dto.password, salt)
		const user = await this.UserService.create({...dto, password: hashedPassword})
		return this.removePassword(user)
	}

	async login(dto: LoginDto){
		const user = await this.UserService.getByEmail(dto.email)
		if (!user) throw new BadRequestException("User with this email does not exist in the system")

		const isPasswordValid = await compare(dto.password, user.password)
		if (!isPasswordValid) throw new BadRequestException("Password is wrong")

		return this.removePassword(user)
	}

	private removePassword(user: any){
		user.password = undefined
		delete user.password
		return user
	}
}
