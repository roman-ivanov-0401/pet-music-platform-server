import { Auth } from "../auth/auth.decorator";
import { Body, Controller, HttpCode, HttpStatus, Post, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { Role } from "../user/user.model";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateAlbumDto } from "./album.dto";
import { AlbumService } from "./album.service";

@Controller("albums")
export class AlbumController {
    constructor(
        private readonly albumService: AlbumService
    ){}

    @UsePipes(new ValidationPipe())
    @Auth(Role.admin)
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(FileInterceptor("cover"))
    @Post()
    create(@Body() dto: CreateAlbumDto, @UploadedFile() cover: Express.Multer.File){
        return this.albumService.create(dto, cover)
    }
}
