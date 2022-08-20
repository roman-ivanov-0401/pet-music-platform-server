import { prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export interface BannerModel extends Base {}

export class BannerModel extends TimeStamps {
  @prop({ default: "" })
  title: string;

  @prop({ default: "" })
  image: string;

  @prop({ default: "" })
  link: string;
}
