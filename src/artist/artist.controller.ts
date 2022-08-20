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
import { ArtistService } from "./artist.service";
import { DeleteAtristsDto, UpdateArtistDto } from "./artist.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { Ref } from "@typegoose/typegoose";
import { ArtistModel } from "./artist.model";
import { Types } from "mongoose";

@Controller("artists")
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get("/:_id")
  getById(@Param("_id") _id: Ref<ArtistModel, Types.ObjectId>) {
    return this.artistService.getById(_id);
  }

  @Get()
  getBySearchTerm(@Query("searchTerm") searchTerm: string) {
    return this.artistService.getBySearchTerm(searchTerm);
  }

  @HttpCode(HttpStatus.OK)
  @Auth(Role.admin)
  @Post()
  create() {
    return this.artistService.create();
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Auth(Role.admin)
  @UseInterceptors(FileInterceptor("image"))
  @Put("/:_id")
  update(
    @Param("_id") _id: string,
    @Body() dto: UpdateArtistDto,
    @UploadedFile() image: Express.Multer.File
  ) {
    return this.artistService.update(_id, dto, image);
  }

  @HttpCode(HttpStatus.OK)
  @Auth(Role.user)
  @Patch("follow/:_id")
  follow(@Param("_id") _id: Ref<ArtistModel, Types.ObjectId>) {
    return this.artistService.follow(_id);
  }

  @HttpCode(HttpStatus.OK)
  @Auth(Role.user)
  @Patch("unfollow/:_id")
  unfollow(@Param("_id") _id: Ref<ArtistModel, Types.ObjectId>) {
    return this.artistService.unfollow(_id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Auth(Role.admin)
  @Delete()
  deleteByIds(@Body() dto: DeleteAtristsDto) {
    return this.artistService.deleteByIds(dto._ids);
  }
}
