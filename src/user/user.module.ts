import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserModel } from './user.model';
import { UserService } from './user.service';

@Module({
  imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: UserModel,
				schemaOptions: {
					collection: "user",
				},
			},
		]),
	],
  controllers: [],
  providers: [UserService]
})
export class UserModule {}
