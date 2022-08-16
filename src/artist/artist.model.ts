import { prop, Ref } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { AlbumModel } from "../album/album.model";
import { EpModel } from "../ep/ep.model";
import { SingleModel } from "../single/single.model";

export interface ArtistModel extends Base {}

export class ArtistModel extends TimeStamps {
  @prop({ required: true })
  name: string;

  @prop()
  image: string;

  @prop({ ref: () => AlbumModel, default: [] })
  albums: Ref<AlbumModel>[];

  @prop({ ref: () => EpModel, default: [] })
  eps: Ref<EpModel>[];

  @prop({ ref: SingleModel, default: [] })
  singles: Ref<SingleModel>[];

  @prop({default: 0})
  followersCount: number;
}
