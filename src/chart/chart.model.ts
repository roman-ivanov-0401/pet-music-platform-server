import { prop, Ref } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { TrackModel } from "../track/track.model";

export interface ChartModel extends Base{}

export class ChartModel extends TimeStamps{
    @prop()
    name: string

    @prop()
    image: string

    @prop({ref: () => TrackModel})
    tracks: Ref<TrackModel>[]
}