import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { FileService } from "../file/file.service";
import { ArtistController } from "./artist.controller";
import { ArtistModel } from "./artist.model";
import { ArtistService } from "./artist.service";

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: ArtistModel,
        schemaOptions: {
          collection: "artist",
        },
      },
    ]),
  ],
  controllers: [ArtistController],
  providers: [ArtistService, FileService],
  exports: [ArtistService]
})
export class ArtistModule {}
