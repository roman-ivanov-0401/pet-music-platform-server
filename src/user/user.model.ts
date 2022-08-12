import { prop, Ref, Severity } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { LibraryModel } from "../library/library.model";

export enum Role { 
    user = "USER",
    admin = "ADMIN"
}

export interface UserModel extends Base {}

export class UserModel extends TimeStamps{
    @prop({unique: true})
    email: string

    @prop()
    name: string

    @prop({minlength: 8})
    password: string

    @prop({allowMixed: Severity.ALLOW, default: [Role.user]})
    roles: Role[]

    @prop({ref: () => LibraryModel})
    library: Ref<LibraryModel>
}