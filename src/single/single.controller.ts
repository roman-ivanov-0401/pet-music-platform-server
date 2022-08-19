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
import { DeleteSinglesDto, UpdateSingleDto } from "./single.dto";
import { SingleService } from "./single.service";
import { YearPipe } from "../pipes/year.pipe";
import { SingleModel } from "./single.model";
import { Types } from "mongoose";
import { Ref } from "@typegoose/typegoose";

@Controller("singles")
export class SingleController {
  constructor(private readonly singleService: SingleService) {}

  @Get()
  getBySearchTerm(@Query("searchTerm") searchTerm: string){
    return this.singleService.getBySearchTerm(searchTerm)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Auth(Role.admin)
  @Post()
  create() {
    return this.singleService.create();
  }

  @UsePipes(YearPipe, new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor("cover"))
  @Auth(Role.admin)
  @Put("/:_id")
  update(
    @Body() dto: UpdateSingleDto,
    @Param("_id") _id: Ref<SingleModel, Types.ObjectId>,
    @UploadedFile() cover: Express.Multer.File
  ) {
    return this.singleService.update(_id, dto, cover);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Auth(Role.admin)
  @Delete()
  deleteByIds(@Body() dto: DeleteSinglesDto){
    return this.singleService.deleteByIds(dto._ids)
  }
}
