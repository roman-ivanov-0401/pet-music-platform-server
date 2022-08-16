import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { InjectModel } from "nestjs-typegoose";
import { CreateGenreDto, UpdateGenreDto } from "./genre.dto";
import { GenreModel } from "./genre.model";

@Injectable()
export class GenreService {
  constructor(
    @InjectModel(GenreModel) private readonly genreModel: ModelType<GenreModel>
  ) {}

  async getAll() {
    return await this.genreModel.find();
  }
  async create(dto: CreateGenreDto) {
    return await this.genreModel.create(dto);
  }
  async editById(_id: string, dto: UpdateGenreDto) {
    try{
      return await this.genreModel.findByIdAndUpdate(_id, dto, { new: true });
    }
    catch(error){
      throw new HttpException("Genre with this id does not exist in the system", HttpStatus.NOT_FOUND)
    }
  }
  async deleteById(_id: string) {
    try{
      return await this.genreModel.findByIdAndDelete(_id);
    }
    catch(error){
      throw new HttpException("Genre with this id does not exist in the system", HttpStatus.NOT_FOUND) 
    }
  }
}
