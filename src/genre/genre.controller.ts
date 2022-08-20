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
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { DeleteGenresDto, UpdateGenreDto } from "./genre.dto";
import { GenreService } from "./genre.service";
import { Role } from "../user/user.model";
import { Ref } from "@typegoose/typegoose";
import { GenreModel } from "./genre.model";
import { Types } from "mongoose";

@Controller("genres")
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get("/:_id")
  getById(@Param("_id") _id: Ref<GenreModel, Types.ObjectId>) {
    return this.genreService.getById(_id);
  }

  @Get("")
  getAll() {
    return this.genreService.getAll();
  }

  @HttpCode(HttpStatus.OK)
  @Auth(Role.user)
  @Post("")
  create() {
    return this.genreService.create();
  }

  @UsePipes(new ValidationPipe())
  @Put(":_id")
  editById(@Param("_id") _id: string, @Body() dto: UpdateGenreDto) {
    return this.genreService.editById(_id, dto);
  }

  @UsePipes(new ValidationPipe())
  @Delete()
  deleteByIds(@Body() dto: DeleteGenresDto) {
    return this.genreService.deleteById(dto._ids);
  }
}
