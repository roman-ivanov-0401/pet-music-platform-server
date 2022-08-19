import { prop, Ref } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { ArtistModel } from "../artist/artist.model";
import { GenreModel } from "../genre/genre.model";
import { TrackModel } from "../track/track.model";

export interface EpModel extends Base {}

export class EpModel extends TimeStamps {
  @prop({ default: "" })
  name: string;

  @prop({ default: [], ref: () => ArtistModel })
  artists: Ref<ArtistModel>[];

  @prop({default: ""})
  cover: string;

  @prop({ ref: () => GenreModel, default: [] })
  genres: Ref<GenreModel>[];

  @prop({ default: 0 })
  year: number;

  @prop({ default: [], ref: () => TrackModel })
  tracks: Ref<TrackModel>[];

  @prop({ default: 0 })
  plays: number;
}
