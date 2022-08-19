import { prop, Ref } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { TrackModel } from "../track/track.model";

export interface RadioModel extends Base {}

export class RadioModel extends TimeStamps {
  @prop({ default: ""})
  name: string;

  @prop({ default: [], ref: () => TrackModel })
  tracks: Ref<TrackModel>[];
}
