import { TrackModel } from "../track/track.model";
import { Ref } from "@typegoose/typegoose";
import { IsArray, IsString } from "class-validator";
import { Types } from "mongoose";
import { RadioModel } from "./radio.model";

export class UpdateRadioDto {
  @IsString()
  name: string;

  @IsArray()
  tracks: Ref<TrackModel, Types.ObjectId>[];
}

export class DeleteRadiosDto {
  _ids: Ref<RadioModel, Types.ObjectId>[];
}
