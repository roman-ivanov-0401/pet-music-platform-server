import { prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export interface GenreModel extends Base {}

export class GenreModel extends TimeStamps {
  @prop({default: ""})
  name: string;
}
