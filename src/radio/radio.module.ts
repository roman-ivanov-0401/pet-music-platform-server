import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { RadioController } from './radio.controller';
import { RadioModel } from './radio.model';
import { RadioService } from './radio.service';

@Module({
  imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: RadioModel,
				schemaOptions: {
					collection: "radio",
				},
			},
		]),
	],
  controllers: [RadioController],
  providers: [RadioService]
})
export class RadioModule {}
