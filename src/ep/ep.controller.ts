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
import { Role } from "../user/user.model";
import { FileInterceptor } from "@nestjs/platform-express";
import { DeleteEpsDto, UpdateEpDto } from "./ep.dto";
import { EpService } from "./ep.service";
import { YearPipe } from "../pipes/year.pipe";
import { EpModel } from "./ep.model";
import { Types } from "mongoose";
import { Ref } from "@typegoose/typegoose";

@Controller("eps")
export class EpController {
  constructor(private readonly epService: EpService) {}

  @Get("/:_id")
  getById(@Param("_id") _id: Ref<EpModel, Types.ObjectId>){
    return this.epService.getById(_id)
  }

  @Get()
  getBySearchTerm(@Query("searchTerm") searchTerm: string){
    return this.epService.getBySearchTerm(searchTerm)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Auth(Role.admin)
  @Post()
  create() {
    return this.epService.create();
  }

  @UsePipes(YearPipe, new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor("cover"))
  @Auth(Role.admin)
  @Put("/:_id")
  update(
    @Body() dto: UpdateEpDto,
    @Param("_id") _id: Ref<EpModel, Types.ObjectId>,
    @UploadedFile() cover: Express.Multer.File
  ) {
    return this.epService.update(_id, dto, cover);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Auth(Role.admin)
  @Delete()
  deleteByIds(@Body() dto: DeleteEpsDto){
    return this.epService.deleteByIds(dto._ids)
  }
}
