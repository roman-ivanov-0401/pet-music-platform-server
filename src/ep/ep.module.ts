import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { EpController } from './ep.controller';
import { EpModel } from './ep.model';
import { EpService } from './ep.service';

@Module({
  imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: EpModel,
				schemaOptions: {
					collection: "ep",
				},
			},
		]),
	],
  controllers: [EpController],
  providers: [EpService]
})
export class EpModule {}
