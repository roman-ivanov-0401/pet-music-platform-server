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
import { Ref } from "@typegoose/typegoose";
import { Role } from "../user/user.model";
import { TrackModel } from "./track.model";
import { TrackService } from "./track.service";
import { Types } from "mongoose";
import { DeleteTracksDto, UpdateTrackDto } from "./track.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { UpdateTrackPipe } from "../pipes/exlipticContent.pipe";

@Controller("tracks")
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get("/:_id")
  getById(@Param("_id") _id: Ref<TrackModel, Types.ObjectId>) {
    return this.trackService.getById(_id);
  }

  @HttpCode(HttpStatus.OK)
  @Auth(Role.admin)
  @Post()
  create() {
    return this.trackService.create();
  }

  @UsePipes(UpdateTrackPipe, new ValidationPipe())
  @UseInterceptors(FileInterceptor("audio"))
  @HttpCode(HttpStatus.OK)
  @Auth(Role.admin)
  @Put("/:_id")
  update(
    @Param("_id") _id: Ref<TrackModel, Types.ObjectId>,
    @Body() dto: UpdateTrackDto,
    @UploadedFile() audio: Express.Multer.File
  ) {
    return this.trackService.update(_id, dto, audio);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Auth(Role.admin)
  @Delete()
  deleteByIds(@Body() dto: DeleteTracksDto) {
    return this.trackService.deleteByIds(dto._ids);
  }
}
