import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypegooseModule } from "nestjs-typegoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { getMongoDBConfig } from "./config/mongo.config";
import { UserModule } from "./user/user.module";
import { LibraryModule } from "./library/library.module";
import { AlbumModule } from "./album/album.module";
import { EpModule } from "./ep/ep.module";
import { SingleModule } from "./single/single.module";
import { PlaylistModule } from "./playlist/playlist.module";
import { TrackModule } from "./track/track.module";
import { ArtistModule } from "./artist/artist.module";
import { BannerModule } from "./banner/banner.module";
import { ChartModule } from "./chart/chart.module";
import { RadioModule } from "./radio/radio.module";
import { GenreModule } from "./genre/genre.module";
import { FileModule } from './file/file.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoDBConfig,
    }),
    AuthModule,
    UserModule,
    LibraryModule,
    AlbumModule,
    EpModule,
    SingleModule,
    PlaylistModule,
    TrackModule,
    ArtistModule,
    BannerModule,
    ChartModule,
    RadioModule,
    GenreModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
