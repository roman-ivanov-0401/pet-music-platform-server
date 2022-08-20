import { prop, Ref } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { TrackModel } from "../track/track.model";

export interface ChartModel extends Base {}

export class ChartModel extends TimeStamps {
  @prop({default: ""})
  name: string;

  @prop({default: ""})
  image: string;

  @prop({ ref: () => TrackModel, default: [] })
  tracks: Ref<TrackModel>[];
}
