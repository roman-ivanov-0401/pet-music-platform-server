import { LibraryService } from "../library/library.service";
import { Injectable } from "@nestjs/common";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { ObjectId } from "mongoose";
import { InjectModel } from "nestjs-typegoose";
import { CreateUserDto } from "./user.dto";
import { UserModel } from "./user.model";

@Injectable()
export class UserService {
	constructor(
		@InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>,
		private readonly LibraryService: LibraryService
	) {}

    async getByEmail(email: string){
        return this.UserModel.findOne({email})
    }

	async create(dto: CreateUserDto) {
		const library = await this.LibraryService.create()
		return await this.UserModel.create({...dto, library: library._id});
	}
}
