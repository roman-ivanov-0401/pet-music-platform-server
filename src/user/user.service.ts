import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CreateUserDto } from './user.dto';
import { UserModel } from './user.model';

@Injectable()
export class UserService {
    constructor(@InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>){}
    async create(dto: CreateUserDto){
    
    }
}
