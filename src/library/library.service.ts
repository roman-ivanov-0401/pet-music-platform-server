import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { LibraryModel } from './library.model';

@Injectable()
export class LibraryService {
    constructor(@InjectModel(LibraryModel) private readonly LibraryModel: ModelType<LibraryModel>){}
    async create(){
        return await this.LibraryModel.create({
            albums: [],
            eps: [],
            singles: [],
            playlists: [],
            favorites: [],
            follows: []
        })
    }
}
