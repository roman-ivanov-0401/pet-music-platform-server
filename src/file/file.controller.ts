import { Auth } from "@auth/auth.decorator";
import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { Role } from "../user/user.model";
import { DeleteFilesDto } from "./file.dto";
import { FileService } from "./file.service";

@Controller("files")
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post("")
  @HttpCode(HttpStatus.OK)
  @Auth(Role.admin)
  @UseInterceptors(FilesInterceptor("files"))
  async uploadFile(
    @UploadedFiles() files: Express.Multer.File[],
    @Query("folder") folder?: string
  ) {
    return this.fileService.saveFiles(files, folder);
  }
  @HttpCode(HttpStatus.OK)
  @Auth(Role.admin)
  @Delete("")
  @UsePipes(new ValidationPipe())
  async deleteFiles(@Body() dto: DeleteFilesDto){
    return this.fileService.removeFiles(dto.paths)
  }
}
