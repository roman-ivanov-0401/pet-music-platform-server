import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { SingleController } from './single.controller';
import { SingleModel } from './single.model';
import { SingleService } from './single.service';

@Module({
  imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: SingleModel,
				schemaOptions: {
					collection: "single",
				},
			},
		]),
	],
  controllers: [SingleController],
  providers: [SingleService]
})
export class SingleModule {}
