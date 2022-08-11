import { prop, Ref } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { AlbumModel } from "src/album/album.model";
import { EpModel } from "src/ep/ep.model";
import { SingleModel } from "src/single/single.model";

export interface ArtistModel extends Base{}

export class ArtistModel extends TimeStamps{
    @prop({required: true})
    name: string

    @prop()
    image: string

    @prop({ref: () => AlbumModel})
    albums: Ref<AlbumModel>[]

    @prop({ref: () => EpModel})
    eps: Ref<EpModel>[]

    @prop({ref: SingleModel})
    singles: Ref<SingleModel>[]

    @prop()
    followersCount: number
}