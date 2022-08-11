import { prop, Ref } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { LibraryModel } from "src/library/library.model";

export type Role = "USER" | "ADMIN"

export interface UserModel extends Base {}

export class UserModel extends TimeStamps{
    @prop({unique: true})
    email: string

    @prop()
    name: string

    @prop({minlength: 8})
    password: string

    @prop()
    roles: Role[]

    @prop({ref: () => LibraryModel})
    library: Ref<LibraryModel>
}