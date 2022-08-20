import { Auth } from "../auth/auth.decorator";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { Role } from "../user/user.model";
import { PlaylistService } from "./playlist.service";
import { Ref } from "@typegoose/typegoose";
import { PlaylistModel } from "./playlist.model";
import { Types } from "mongoose";
import { DeletePlaylistsDto, UpdatePlaylistDto } from "./playlist.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("playlists")
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Get("/:_id")
  getById(@Param("_id") _id: Ref<PlaylistModel, Types.ObjectId>) {
    return this.playlistService.getById(_id);
  }

  @Get()
  getBySearchTerm(@Query("searchTerm") searchTerm: string) {
    return this.playlistService.getBySearchTerm(searchTerm);
  }

  @HttpCode(HttpStatus.OK)
  @Auth(Role.admin)
  @Post()
  create() {
    return this.playlistService.create();
  }

  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor("image"))
  @HttpCode(HttpStatus.OK)
  @Auth(Role.admin)
  @Put("/:_id")
  update(
    @Param("_id") _id: Ref<PlaylistModel, Types.ObjectId>,
    @Body() dto: UpdatePlaylistDto,
    @UploadedFile() image: Express.Multer.File
  ) {
    return this.playlistService.update(_id, dto, image);
  }

  @HttpCode(HttpStatus.OK)
  @Patch("/:_id")
  incrementPlays(@Param("_id") _id: Ref<PlaylistModel, Types.ObjectId>) {
    return this.playlistService.incrementPlays(_id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Auth(Role.admin)
  @Delete()
  deleteByIds(@Body() dto: DeletePlaylistsDto) {
    return this.playlistService.deleteByIds(dto);
  }
}
