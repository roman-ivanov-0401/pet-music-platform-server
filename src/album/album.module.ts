import { Module } from "@nestjs/common";
import { TrackService } from "../track/track.service";
import { TypegooseModule } from "nestjs-typegoose";
import { FileModule } from "../file/file.module";
import { AlbumController } from "./album.controller";
import { AlbumModel } from "./album.model";
import { AlbumService } from "./album.service";
import { FileService } from "../file/file.service";

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: AlbumModel,
        schemaOptions: {
          collection: "album",
        },
      },
    ]), 
    FileModule
  ],
  controllers: [AlbumController],
  providers: [AlbumService, FileService],
  exports: [AlbumService]
})
export class AlbumModule {}
