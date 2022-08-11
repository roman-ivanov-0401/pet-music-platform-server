import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ArtistController } from './artist.controller';
import { ArtistModel } from './artist.model';
import { ArtistService } from './artist.service';

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
  providers: [ArtistService]
})
export class ArtistModule {}
