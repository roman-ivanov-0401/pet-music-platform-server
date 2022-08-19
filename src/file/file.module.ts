import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FileController } from './file.controller';
import { FileService } from './file.service';
const path = require("path");

const absPath = path.resolve(__dirname, "..", "..");

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: `${absPath}/uploads`,
      serveRoot: "/uploads"
    })
  ],
  controllers: [FileController],
  providers: [FileService]
})
export class FileModule {}
