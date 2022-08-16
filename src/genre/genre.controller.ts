import { Auth } from "../auth/auth.decorator";
import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { CreateGenreDto, UpdateGenreDto } from "./genre.dto";
import { GenreService } from "./genre.service";
import { Role } from "../user/user.model";

@Controller("genres")
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get("")
  getAll() {
    return this.genreService.getAll();
  }

  @UsePipes(new ValidationPipe())
  @Auth(Role.user)
  @Post("")
  create(@Body() dto: CreateGenreDto) {
    return this.genreService.create(dto);
  }

  @UsePipes(new ValidationPipe())
  @Put(":_id")
  editById(@Param("_id") _id: string, @Body() dto: UpdateGenreDto) {
    return this.genreService.editById(_id, dto);
  }

  @Delete(":_id")
  deleteById(@Param("_id") _id: string) {
    return this.genreService.deleteById(_id);
  }
}
