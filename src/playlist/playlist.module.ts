import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { PlaylistController } from './playlist.controller';
import { PlaylistModel } from './playlist.model';
import { PlaylistService } from './playlist.service';

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
	],
  controllers: [PlaylistController],
  providers: [PlaylistService]
})
export class PlaylistModule {}
