import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { LoginDto, RegisterDto } from "./auth.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
	constructor(private readonly AuthService: AuthService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(HttpStatus.OK)
	@Post("register")
	register(@Body() dto: RegisterDto) {
		return this.AuthService.register(dto);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(HttpStatus.OK)
	@Post("login")
	login(@Body() dto: LoginDto){
		return this.AuthService.login(dto)
	}
}
