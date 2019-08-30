import { ObjectId } from "mongodb";
import { fetch } from "apollo-server-env";
import TicketModel, { Ticket } from "../entities/ticket";
import MovieModel, { Movie } from "../entities/Movie";
import { MovieInput, SaveMoviesInput } from "../resolvers/types/Movie.input";
import { BASE_OMDB_URL } from '../helpers/constants';

export async function findMovieById(id: ObjectId): Promise<Movie> {
  const movie = await MovieModel.findById(id);
  if (!movie) {
    throw new Error('No movie found!')
  };
  return movie;
}


export async function saveMovies(): Promise<void> {

  try {
    console.log("I am here");
    /*await MovieModel.deleteMany({});

    const tickets = await TicketModel.find({}).sort('_id');

    tickets.map(async (ticket: Ticket) => {
      const movieSearching = await fetch(`${BASE_OMDB_URL}${encodeURI(ticket.title)}`).then(response => response.json());
      if (movieSearching) {
        const movie = new MovieModel({
          title: movieSearching.Title,
          year: movieSearching.Year,
          rated: movieSearching.Rated,
          released: movieSearching.Released,
          runtime: movieSearching.Runtime,
          genre: movieSearching.Genre.split(','),
          country: movieSearching.Country,
        });
        ticket.movie = movie._id;
        movie.tickets.push(ticket);
        await movie.save();
      }
    });*/
  } catch(error) {
    throw new Error(error);
  }
}