import { prop, Ref } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { TrackModel } from "src/track/track.model";
import { UserModel } from "src/user/user.model";

export interface PlaylistModel extends Base{}

export class PlaylistModel extends TimeStamps{
    @prop({required: true})
    name: string

    @prop({ref: () => UserModel})
    author: Ref<UserModel>

    @prop()
    image: string

    @prop({default: [], ref: () => TrackModel})
    tracks: Ref<TrackModel>[]

    @prop({default: 0})
    plays: number
}