import { Arg, Mutation, Query, Resolver, FieldResolver, Root } from "type-graphql";
import { ObjectId } from "mongodb";
import { Movie } from "../entities/Movie";
import { Ticket } from "../entities/ticket";
import { SaveMoviesInput, MovieInput  } from "./types/Movie.input";
import * as movieService from '../services/Movie.service';
import * as ticketService from '../services/Ticket.service';

@Resolver(() => Movie)
export class MovieResolver {

  @Mutation(() => Boolean)
  public async saveMovies(): Promise<boolean> {
    console.log("saveMovies");
    await movieService.saveMovies();
    return true;
  }

  @FieldResolver()
  public async tickets(@Root() movie: Movie): Promise<Ticket[] | null> {
    return ticketService.findTicketsByMovieId(movie._id)
  }
}
