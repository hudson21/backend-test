import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { ObjectId } from "mongodb";
import { Ticket } from "../entities/ticket";

import { AddTicketInput, ListTicketsInput, TicketInput, SaveTicketsInput } from "./types/Ticket.input";
import { saveTickets, addTicket, ticket, listTickets } from '../services/Ticket.service';

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

  @Mutation(() => Ticket)
  public async addTicket(@Arg("input") ticketInput: AddTicketInput): Promise<Ticket> {
    return addTicket(ticketInput);
  }

  @Mutation(() => [Ticket])
  public async saveTickets(@Arg("input") ticketInput: SaveTicketsInput): Promise<Ticket[]> {
    return saveTickets(ticketInput);
  }
}
