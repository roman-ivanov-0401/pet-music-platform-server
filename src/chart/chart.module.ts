import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { FileModule } from "../file/file.module";
import { FileService } from "../file/file.service";
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
    FileModule
  ],
  controllers: [ChartController],
  providers: [ChartService, FileService],
})
export class ChartModule {}
