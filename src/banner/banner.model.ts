import { prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export interface BannerModel extends Base{}

export class BannerModel extends TimeStamps{
    @prop({required: true})
    title: string

    @prop({required: true})
    image: string

    @prop()
    link: string
}