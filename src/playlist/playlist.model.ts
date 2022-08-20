import { prop, Ref } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { TrackModel } from "../track/track.model";
import { UserModel } from "../user/user.model";

export interface PlaylistModel extends Base {}

export class PlaylistModel extends TimeStamps {
  @prop({ default: "" })
  name: string;

  @prop({ ref: () => UserModel, default: [] })
  author: Ref<UserModel>[];

  @prop({default: ""})
  image: string;

  @prop({ default: [], ref: () => TrackModel })
  tracks: Ref<TrackModel>[];

  @prop({ default: 0 })
  plays: number;
}
