import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ModelType, Ref } from "@typegoose/typegoose/lib/types";
import { Types } from "mongoose";
import { InjectModel } from "nestjs-typegoose";
import { UpdateGenreDto } from "./genre.dto";
import { GenreModel } from "./genre.model";

@Injectable()
export class GenreService {
  constructor(
    @InjectModel(GenreModel) private readonly genreModel: ModelType<GenreModel>
  ) {}

  async getById(_id: Ref<GenreModel, Types.ObjectId>) {
    return await this.genreModel.findById(_id, "-__v -createdAt -updatedAt");
  }

  async getAll() {
    return await this.genreModel.find({}, "-__v -createdAt -updatedAt");
  }
  async create() {
    return await this.genreModel.create({});
  }
  async editById(_id: string, dto: UpdateGenreDto) {
    try {
      return await this.genreModel.findByIdAndUpdate(_id, dto, { new: true });
    } catch (error) {
      throw new HttpException(
        "Genre with this id does not exist in the system",
        HttpStatus.NOT_FOUND
      );
    }
  }
  async deleteById(_ids: Ref<GenreModel, Types.ObjectId>[]) {
    try {
      await this.genreModel.deleteMany({ _id: { $in: _ids } });
    } catch (error) {
      throw new HttpException(
        "Genre with this id does not exist in the system",
        HttpStatus.NOT_FOUND
      );
    }
  }
}
