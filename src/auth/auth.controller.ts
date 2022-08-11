import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dtos";

@Controller("auth")
export class AuthController {
	constructor(private readonly AuthService: AuthService) {}
	@Post("register")
	register(@Body() dto: RegisterDto) {
		return this.AuthService.register(dto);
	}
}
