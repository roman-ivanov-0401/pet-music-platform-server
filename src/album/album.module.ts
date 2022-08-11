import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { AlbumController } from "./album.controller";
import { AlbumModel } from "./album.model";
import { AlbumService } from "./album.service";

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
	],
	controllers: [AlbumController],
	providers: [AlbumService],
})
export class AlbumModule {}
