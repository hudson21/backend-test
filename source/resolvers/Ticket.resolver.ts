import { Arg, Mutation, Query, Resolver, FieldResolver, Root } from "type-graphql";
import { ObjectId } from "mongodb";
import { Ticket } from "../entities/ticket";
import { Movie } from "../entities/Movie";
import { AddTicketInput, ListTicketsInput, TicketInput, SaveTicketsInput, ListTicketsWithPagination } from "./types/Ticket.input";
import { saveTickets, addTicket, ticket, listTickets, listTicketsWithPagination } from '../services/Ticket.service';
import * as movieService from '../services/Movie.service';

@Resolver(() => Ticket)
export class TicketResolver {

  @Query(() => Ticket, { nullable: true })
  public async ticket(@Arg("input") ticketInput: TicketInput): Promise<Ticket> {
    return ticket(ticketInput);
  }

  @Query(() => [Ticket])
  public async listTickets(@Arg("input") ticketInput: ListTicketsInput): Promise<Ticket[]> {
    return listTickets(ticketInput);
  }

  @Query(() => [Ticket])
  public async listTicketsWithPagination(@Arg("input") ticketInput: ListTicketsWithPagination): Promise<Ticket[]> {
    return listTicketsWithPagination(ticketInput);
  }

  @Mutation(() => Ticket)
  public async addTicket(@Arg("input") ticketInput: AddTicketInput): Promise<Ticket> {
    return addTicket(ticketInput);
  }

  @Mutation(() => Boolean)
  public async saveTickets(@Arg("input") ticketInput: SaveTicketsInput): Promise<boolean> {
    await saveTickets(ticketInput);
    return true;
  }

  @FieldResolver()
  public async movie(@Root() ticket: Ticket): Promise<Movie | null> {
    return ticket.movie ? movieService.findMovieById(ticket.movie as ObjectId) : null
  }
}
