import { Injectable } from "@nestjs/common";
import { RegisterDto } from "./dtos";

@Injectable()
export class AuthService {
	async register(dto: RegisterDto) {
		return dto;
	}
}
