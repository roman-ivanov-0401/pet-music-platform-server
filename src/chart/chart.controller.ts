import { Auth } from "../auth/auth.decorator";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { Ref } from "@typegoose/typegoose";
import { Role } from "../user/user.model";
import { Types } from "mongoose";
import { ChartModel } from "./chart.model";
import { ChartService } from "./chart.service";
import { DeleteChartsDto, UpdateChartDto } from "./chart.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("charts")
export class ChartController {
  constructor(private readonly chartService: ChartService) {}

  @Get("/:_id")
  getById(@Param("_id") _id: Ref<ChartModel, Types.ObjectId>) {
    return this.chartService.getById(_id);
  }

  @Get()
  getBySearchterm(@Query("searchTerm") searchTerm: string) {
    return this.chartService.getBySearchTerm(searchTerm);
  }

  @HttpCode(HttpStatus.OK)
  @Auth(Role.admin)
  @Post()
  create() {
    return this.chartService.create();
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Auth(Role.admin)
  @UseInterceptors(FileInterceptor("image"))
  @Put("/:_id")
  update(
    @Param("_id") _id: Ref<ChartModel, Types.ObjectId>,
    @Body() dto: UpdateChartDto,
    @UploadedFile() image: Express.Multer.File
  ) {
    return this.chartService.update(_id, dto, image);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Auth(Role.admin)
  @Delete()
  deleteByIds(@Body() dto: DeleteChartsDto) {
    return this.chartService.deleteByIds(dto._ids);
  }
}
