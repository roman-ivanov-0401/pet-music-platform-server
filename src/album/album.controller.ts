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
import { DeleteAlbumsDto, UpdateAlbumDto } from "./album.dto";
import { AlbumService } from "./album.service";
import { YearPipe } from "../pipes/year.pipe";
import { AlbumModel } from "./album.model";
import { Types } from "mongoose";
import { Ref } from "@typegoose/typegoose";

@Controller("albums")
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  getBySearchTerm(@Query("searchTerm") searchTerm: string){
    return this.albumService.getBySearchTerm(searchTerm)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Auth(Role.admin)
  @Post()
  create() {
    return this.albumService.create();
  }

  @UsePipes(YearPipe, new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor("cover"))
  @Auth(Role.admin)
  @Put("/:_id")
  update(
    @Body() dto: UpdateAlbumDto,
    @Param("_id") _id: Ref<AlbumModel, Types.ObjectId>,
    @UploadedFile() cover: Express.Multer.File
  ) {
    return this.albumService.update(_id, dto, cover);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Auth(Role.admin)
  @Delete()
  deleteByIds(@Body() dto: DeleteAlbumsDto){
    return this.albumService.deleteByIds(dto._ids)
  }
}
