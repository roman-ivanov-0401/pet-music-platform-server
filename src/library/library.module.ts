import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { LibraryModel } from "./library.model";
import { LibraryService } from "./library.service";

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: LibraryModel,
        schemaOptions: {
          collection: "library",
        },
      },
    ]),
  ],
  providers: [LibraryService],
  exports: [LibraryService],
})
export class LibraryModule {}
