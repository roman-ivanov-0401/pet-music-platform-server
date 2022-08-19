import { prop, Ref } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { ArtistModel } from "../artist/artist.model";

export interface TrackModel extends Base {}

export class TrackModel extends TimeStamps {
  @prop({ default: "" })
  name: string;

  @prop({ ref: () => ArtistModel, default: [] })
  artists: Ref<ArtistModel>[];

  @prop({ ref: () => ArtistModel, default: [] })
  feats: Ref<ArtistModel>[];

  @prop({ default: "" })
  audio: string;

  @prop({ default: "" })
  cover: string;

  @prop({ default: "" })
  lyrics: string;

  @prop({ default: false })
  eclipticContent: boolean;

  @prop({ default: 0 })
  duration: number;
}
