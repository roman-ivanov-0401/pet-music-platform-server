import { prop, Ref } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { ArtistModel } from "../artist/artist.model";
import { GenreModel } from "../genre/genre.model";
import { TrackModel } from "../track/track.model";

export interface SingleModel extends Base {}

export class SingleModel extends TimeStamps {
  @prop({ default: "" })
  name: string;

  @prop({ default: [], ref: () => ArtistModel })
  artists: Ref<ArtistModel>[];

  @prop({ default: "" })
  cover: string;

  @prop({ required: true, ref: () => GenreModel })
  genres: Ref<GenreModel>[];

  @prop({ default: 0 })
  year: number;

  @prop({ default: [], ref: () => TrackModel })
  tracks: Ref<TrackModel>[];

  @prop({ default: 0 })
  plays: number;
}
