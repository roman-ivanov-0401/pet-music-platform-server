import { prop, Ref } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { ArtistModel } from "../artist/artist.model";
import { GenreModel } from "../genre/genre.model";
import { TrackModel } from "../track/track.model";

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