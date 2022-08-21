import { ArtistModule } from '../artist/artist.module';
import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { ArtistService } from '../artist/artist.service';
import { AlbumModule } from '../album/album.module';
import { EpModule } from '../ep/ep.module';
import { SingleModule } from '../single/single.module';
import { PlaylistModule } from '../playlist/playlist.module';

@Module({
  imports: [
    ArtistModule,
    AlbumModule,
    EpModule,
    SingleModule,
    PlaylistModule
  ],
  controllers: [SearchController],
  providers: [SearchService]
})
export class SearchModule {}
