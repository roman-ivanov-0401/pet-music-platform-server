import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";
import { Ref } from "@typegoose/typegoose";
import { TrackModel } from "../track/track.model";
import { Types } from "mongoose";
import { ArtistModel } from "../artist/artist.model";
import { GenreModel } from "../genre/genre.model";
import { AlbumModel } from "./album.model";

export class UpdateAlbumDto{
    @IsString()
    name: string

    @IsNumber()
    year: number;

    @IsOptional()
    @IsArray()
    genres: Ref<GenreModel, Types.ObjectId>[]

    @IsOptional()
    @IsArray()
    artists: Ref<ArtistModel, Types.ObjectId>[]

    @IsOptional()
    @IsArray()
    tracks: Ref<TrackModel, Types.ObjectId>[]
}

export class DeleteAlbumsDto{
    _ids: Ref<AlbumModel, Types.ObjectId>[]
}
