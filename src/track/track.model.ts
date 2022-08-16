import { prop, Ref } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { ArtistModel } from "../artist/artist.model";

export interface TrackModel extends Base {}

export class TrackModel extends TimeStamps {
  @prop()
  name: string;

  @prop({ ref: () => ArtistModel })
  artists: Ref<ArtistModel>[];

  @prop({ ref: () => ArtistModel })
  feats: Ref<ArtistModel>[];

  @prop()
  audio: string;

  @prop()
  cover: string;

  @prop()
  lyrics: string;
}
