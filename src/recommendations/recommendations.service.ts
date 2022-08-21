import { Injectable } from "@nestjs/common";
import { Ref } from "@typegoose/typegoose";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { Types } from "mongoose";
import { InjectModel } from "nestjs-typegoose";
import { UserModel } from "../user/user.model";
import { ArtistModel } from "../artist/artist.model";
import { GenreModel } from "@genre/genre.model";

@Injectable()
export class RecommendationsService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>
  ) {}

  async forYou(_id: Ref<UserModel, Types.ObjectId>, limit: number) {
    const user = await this.userModel
      .findById(_id, "-email -password -roles -__v -createdAt -updatedAt")
      .populate({
        path: "library",
        populate: [
          {
            path: "albums",
            select: "artists feats genres",
          },
          {
            path: "eps",
            select: "artists feats genres",
          },
          {
            path: "singles",
            select: "artists feats genres",
          },
          {
            path: "follows",
          },
          {
            path: "favorites",
            populate: [
              {
                path: "artists",
              },
              {
                path: "feats",
              },
            ],
          },
        ],
      })
      .exec();

    const library: any = user.library;

    const genres = new Set();
    const artists = new Set();

    library.albums.forEach(album => {
        album.artists.forEach((artist: ArtistModel) => {
            artists.add(artist._id)
        })
        album.feats.forEach((feat: ArtistModel) => {
            artists.add(feat._id)
        })
        album.genres.forEach((genre: GenreModel) => {
            genres.add(genre._id)
        })
    })

    library.eps.forEach(ep => {
        ep.artists.forEach((artist: ArtistModel) => {
            artists.add(artist._id)
        })
        ep.feats.forEach((feat: ArtistModel) => {
            artists.add(feat._id)
        })
        ep.genres.forEach((genre: GenreModel) => {
            genres.add(genre._id)
        })
    })

    library.singles.forEach(single => {
        single.artists.forEach((artist: ArtistModel) => {
            artists.add(artist._id)
        })
        single.feats.forEach((feat: ArtistModel) => {
            artists.add(feat._id)
        })
        single.genres.forEach((genre: GenreModel) => {
            genres.add(genre._id)
        })
    })

    library.follows.forEach((follow: ArtistModel) => {
        artists.add(follow._id)
    })

    library.favorites.forEach((track: any) => {
        track.artists.forEach((artist: any) => {
            artists.add(artist._id)
        })
        track.feats.forEach((artist: any) => {
            artists.add(artist._id)
        })
    })

    
  }
}
