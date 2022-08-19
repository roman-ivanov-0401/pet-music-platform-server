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

@Controller("genres")
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

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
