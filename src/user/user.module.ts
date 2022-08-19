import { LibraryModule } from "@library/library.module";
import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { UserController } from "./user.controller";
import { UserModel } from "./user.model";
import { UserService } from "./user.service";

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: UserModel,
        schemaOptions: {
          collection: "user",
        },
      },
    ]),
    LibraryModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
