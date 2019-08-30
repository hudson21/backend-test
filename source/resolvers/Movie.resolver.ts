import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { ObjectId } from "mongodb";
import { Movie } from "../entities/Movie";

import { SaveMoviesInput, MovieInput  } from "./types/Movie.input";
import { saveMovies } from '../services/Movie.service';

@Resolver(() => Movie)
export class MovieResolver {

  @Mutation(() => [Movie])
  public async saveMovies(): Promise<Movie[]> {
    return await saveMovies();
  }
}
