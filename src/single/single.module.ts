import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { FileService } from "src/file/file.service";
import { SingleController } from "./single.controller";
import { SingleModel } from "./single.model";
import { SingleService } from "./single.service";

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: SingleModel,
        schemaOptions: {
          collection: "single",
        },
      },
    ]),
  ],
  controllers: [SingleController],
  providers: [SingleService, FileService],
})
export class SingleModule {}
