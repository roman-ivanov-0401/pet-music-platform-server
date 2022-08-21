import { Ref } from "@typegoose/typegoose";
import { IsArray, IsString } from "class-validator";
import { Types } from "mongoose";
import { ChartModel } from "./chart.model";

export class UpdateChartDto {
    @IsString()
    name: string

    @IsArray()
    tracks: Ref<ChartModel, Types.ObjectId>
}

export class DeleteChartsDto {
    @IsArray()
    _ids: Ref<ChartModel, Types.ObjectId>[]
}