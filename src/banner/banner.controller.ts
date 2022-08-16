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
import { CreateBannerDto, DeleteBannersDto, UpdateBannerDto } from "./banner.dto";
import { FileInterceptor } from "@nestjs/platform-express";

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

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Auth(Role.admin)
  @UseInterceptors(FileInterceptor("image"))
  @Post("")
  create(
    @Body() dto: CreateBannerDto,
    @UploadedFile() image: Express.Multer.File
  ) {
    return this.bannerService.create(dto, image);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Auth(Role.admin)
  @UseInterceptors(FileInterceptor("image"))
  @Put("/:_id")
  update(
    @Body() dto: UpdateBannerDto,
    @UploadedFile() image: Express.Multer.File,
    @Param("_id") _id: string
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
