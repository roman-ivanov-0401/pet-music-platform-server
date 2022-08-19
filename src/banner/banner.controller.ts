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
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { Role } from "../user/user.model";
import { BannerService } from "./banner.service";
import { DeleteBannersDto, UpdateBannerDto } from "./banner.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { Ref } from "@typegoose/typegoose";
import { BannerModel } from "./banner.model";
import { Types } from "mongoose";

@Controller("banners")
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Get("")
  getAll() {
    return this.bannerService.getAll();
  }

  @Get("newest")
  getNewest() {
    return this.bannerService.getNewest();
  }

  @HttpCode(HttpStatus.OK)
  @Auth(Role.admin)
  @Post("")
  create() {
    return this.bannerService.create();
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Auth(Role.admin)
  @UseInterceptors(FileInterceptor("image"))
  @Put("/:_id")
  update(
    @Body() dto: UpdateBannerDto,
    @UploadedFile() image: Express.Multer.File,
    @Param("_id") _id: Ref<BannerModel, Types.ObjectId>
  ) {
    return this.bannerService.update(_id, dto, image);
  }

  @HttpCode(HttpStatus.OK)
  @Auth(Role.admin)
  @UsePipes(new ValidationPipe())
  @Delete("")
  deleteByIds(@Body() dto: DeleteBannersDto) {
    return this.bannerService.deleteByIds(dto._ids);
  }
}
