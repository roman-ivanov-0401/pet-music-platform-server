import { ArtistModel } from "../artist/artist.model";
import { Ref } from "@typegoose/typegoose";
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";
import { TrackModel } from "./track.model";

export class UpdateTrackDto {
  @IsString()
  name: string;

  @IsString()
  lyrics: string;

  @IsBoolean()
  eclipticContent: boolean;

  @IsNumber()
  duration: number;

  @IsOptional()
  @IsArray()
  artists: Ref<ArtistModel, Types.ObjectId>[];

  @IsOptional()
  @IsArray()
  feats: Ref<ArtistModel, Types.ObjectId>[];
}

export class DeleteTracksDto {
  @IsArray()
  _ids: Ref<TrackModel, Types.ObjectId>;
}
