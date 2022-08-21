import { TrackModel } from "../track/track.model";
import { Ref } from "@typegoose/typegoose";
import { IsArray, IsString } from "class-validator";
import { Types } from "mongoose";
import { PlaylistModel } from "./playlist.model";
import { UserModel } from "@user/user.model";

export class UpdatePlaylistDto {
    @IsString()
    name: string

    @IsArray()
    author: Ref<UserModel, Types.ObjectId>[]

    @IsArray()
    tracks: Ref<TrackModel, Types.ObjectId>[]
}

export class DeletePlaylistsDto {
    _ids: Ref<PlaylistModel, Types.ObjectId>[]
}