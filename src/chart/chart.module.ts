import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { ChartController } from "./chart.controller";
import { ChartModel } from "./chart.model";
import { ChartService } from "./chart.service";

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: ChartModel,
        schemaOptions: {
          collection: "chart",
        },
      },
    ]),
  ],
  controllers: [ChartController],
  providers: [ChartService],
})
export class ChartModule {}
