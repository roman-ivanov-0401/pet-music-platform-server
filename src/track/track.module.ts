import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { FileService } from "src/file/file.service";
import { TrackController } from "./track.controller";
import { TrackModel } from "./track.model";
import { TrackService } from "./track.service";

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: TrackModel,
        schemaOptions: {
          collection: "track",
        },
      },
    ]),
  ],
  controllers: [TrackController],
  providers: [TrackService, FileService]
})
export class TrackModule {}
