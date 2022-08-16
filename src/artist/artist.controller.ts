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
import { ArtistService } from "./artist.service";
import {
  CreateArtistDto,
  DeleteAtristsDto,
  UpdateArtistDto,
} from "./artist.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("artists")
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  getBySearchTerm(@Query("searchTerm") searchTerm: string) {
    return this.artistService.getBySearchTerm(searchTerm);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Auth(Role.admin)
  @UseInterceptors(FileInterceptor("image"))
  @Post()
  create(
    @Body() dto: CreateArtistDto,
    @UploadedFile() image: Express.Multer.File
  ) {
    return this.artistService.create(dto, image);
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

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Auth(Role.admin)
  @Delete()
  deleteByIds(@Body() dto: DeleteAtristsDto) {
    return this.artistService.deleteByIds(dto._ids);
  }
}
