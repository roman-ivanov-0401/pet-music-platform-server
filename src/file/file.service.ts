import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { FileResponse } from "./file.interface";
import { ensureDir, writeFile, remove } from "fs-extra";
import { v4 } from "uuid";
const path = require("path");

const absPath = path.resolve(__dirname, "..", "..");

@Injectable()
export class FileService {
  async saveFiles(
    files: Express.Multer.File[],
    folder: string = "default"
  ): Promise<FileResponse[]> {
    const uploadFolder = `${absPath}/uploads/${folder}`;
    await ensureDir(uploadFolder)
    const res: FileResponse[] = await Promise.all(
      files.map(async (file) => {
        const fileName = `${v4()}${file.originalname}`;
        await writeFile(`${uploadFolder}/${fileName}`, file.buffer);

        return {
          url: `uploads/${folder}/${fileName}`,
          name: fileName,
        };
      })
    );

    return res;
  }

  async removeFiles(paths: string[]) {
    paths.forEach(async (path) => {
      try {
        remove(path);
      } catch (e) {
        throw new HttpException(
          `File ${path} does not exist`,
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    });
    return paths
  }
}
