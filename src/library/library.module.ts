import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { LibraryController } from './library.controller';
import { LibraryModel } from './library.model';
import { LibraryService } from './library.service';

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
  controllers: [LibraryController],
  providers: [LibraryService]
})
export class LibraryModule {}
