import { prop, Ref } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { ArtistModel } from "src/artist/artist.model";
import { GenreModel } from "src/genre/genre.model";
import { TrackModel } from "src/track/track.model";

export interface EpModel extends Base{}

export class EpModel extends TimeStamps{
    @prop({required: true})
    name: string

    @prop({default: [], ref: () => ArtistModel})
    artists: Ref<ArtistModel>[]

    @prop()
    cover: string

    @prop({required: true, ref: () => GenreModel})
    genres: Ref<GenreModel>[]

    @prop({required: true})
    releaseDate: Date

    @prop({default: [], ref: () => TrackModel})
    tracks: Ref<TrackModel>[]

    @prop({default: 0})
    plays: number
}