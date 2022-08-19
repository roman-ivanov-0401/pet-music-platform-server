import { Ref } from "@typegoose/typegoose";
import { IsArray, IsString } from "class-validator";
import { Types } from "mongoose";
import { GenreModel } from "./genre.model";


export class UpdateGenreDto {
  @IsString()
  name: string;
}

export class DeleteGenresDto {
  @IsArray()
  _ids: Ref<GenreModel, Types.ObjectId>[]
}
