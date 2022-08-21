import { Module } from "@nestjs/common";
import { UserModel } from "@user/user.model";
import { TypegooseModule } from "nestjs-typegoose";
import { RecommendationsController } from "./recommendations.controller";
import { RecommendationsService } from "./recommendations.service";

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: UserModel,
        schemaOptions: {
          collection: "user",
          toJSON: { virtuals: true },
          toObject: { virtuals: true }
        },
      },
    ]),
  ],
  controllers: [RecommendationsController],
  providers: [RecommendationsService],
})
export class RecommendationsModule {}
