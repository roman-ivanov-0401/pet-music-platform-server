import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { FileService } from "../file/file.service";
import { BannerController } from "./banner.controller";
import { BannerModel } from "./banner.model";
import { BannerService } from "./banner.service";

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: BannerModel,
        schemaOptions: {
          collection: "banner",
        },
      },
    ]),
  ],
  controllers: [BannerController],
  providers: [BannerService, FileService],
})
export class BannerModule {}
