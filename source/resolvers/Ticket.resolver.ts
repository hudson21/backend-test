import { Arg, Mutation, Query, Resolver, FieldResolver, Root } from "type-graphql";
import { ObjectId } from "mongodb";
import { Ticket } from "../entities/ticket";
import { Movie } from "../entities/Movie";
import { AddTicketInput, ListTicketsInput, TicketInput, SaveTicketsInput, ListTicketsWithPagination } from "./types/Ticket.input";
import * as movieService from '../services/Movie.service';
import * as ticketService from '../services/Ticket.service';

@Resolver(() => Ticket)
export class TicketResolver {

  @Query(() => Ticket, { nullable: true })
  public async ticket(@Arg("input") ticketInput: TicketInput): Promise<Ticket> {
    return ticketService.ticket(ticketInput);
  }

  @Query(() => [Ticket])
  public async listTickets(@Arg("input") ticketInput: ListTicketsInput): Promise<Ticket[]> {
    return ticketService.listTickets(ticketInput);
  }

  @Query(() => [Ticket])
  public async listTicketsWithPagination(@Arg("input") ticketInput: ListTicketsWithPagination): Promise<Ticket[]> {
    return ticketService.listTicketsWithPagination(ticketInput);
  }

  @Mutation(() => Ticket)
  public async addTicket(@Arg("input") ticketInput: AddTicketInput): Promise<Ticket> {
    return ticketService.addTicket(ticketInput);
  }

  @Mutation(() => Boolean)
  public async saveTickets(@Arg("input") ticketInput: SaveTicketsInput): Promise<boolean> {
    await ticketService.saveTickets(ticketInput);
    return true;
  }

  @FieldResolver()
  public async movie(@Root() ticket: Ticket): Promise<Movie | null> {
    return ticket.movie ? movieService.findMovieById(ticket.movie as ObjectId) : null
  }
}
