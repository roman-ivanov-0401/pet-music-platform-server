import { AlbumModel } from "../album/album.model";
import { EpModel } from "../ep/ep.model";
import { SingleModel } from "../single/single.model";
import { Ref } from "@typegoose/typegoose";
import { IsArray, IsString } from "class-validator";
import { Types } from "mongoose";

export class UpdateArtistDto {
  @IsString()
  name: string;

  @IsArray()
  albums: Ref<AlbumModel, Types.ObjectId>[]

  @IsArray()
  eps: Ref<EpModel, Types.ObjectId>[]

  @IsArray()
  singles: Ref<SingleModel, Types.ObjectId>[]
}

export class DeleteAtristsDto {
  @IsArray()
  _ids: string[];
}
