import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { FileService } from "src/file/file.service";
import { FileModule } from "../file/file.module";
import { PlaylistController } from "./playlist.controller";
import { PlaylistModel } from "./playlist.model";
import { PlaylistService } from "./playlist.service";

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: PlaylistModel,
        schemaOptions: {
          collection: "playlist",
        },
      },
    ]),
    FileModule
  ],
  controllers: [PlaylistController],
  providers: [PlaylistService, FileService],
})
export class PlaylistModule {}
