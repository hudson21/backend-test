import { Arg, Mutation, Query, Resolver } from "type-graphql";

import TicketModel, { Ticket } from "../entities/ticket"

import { AddTicketInput, ListTicketsInput, TicketInput, SaveTicketsInput } from "./types/Ticket.input"
import { fetch } from "apollo-server-env";

@Resolver(() => Ticket)
export class TicketResolver {

  @Query(() => Ticket, { nullable: true })
  public async ticket(@Arg("input") ticketInput: TicketInput): Promise<Ticket> {
    const ticket = await TicketModel.findById(ticketInput.id)
    if (!ticket) {
      throw new Error("No ticket found!")
    }
    return ticket
  }

  @Query(() => [Ticket])
  public async listTickets(@Arg("input") input: ListTicketsInput): Promise<Ticket[]> {
    const tickets = await TicketModel.find({})
    const result = tickets
      .filter(ticket => ticket.date.getTime() < input.cursor.getTime())
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, input.limit)
    return result
  }

  @Mutation(() => Ticket)
  public async addTicket(@Arg("input") ticketInput: AddTicketInput): Promise<Ticket> {
    const ticket = new TicketModel(ticketInput)
    return ticket.saveFields()
  }

  @Mutation()
  public async saveTickets(@Arg("input") ticketInput: SaveTicketsInput): Promise<Ticket[]> {
    let skip = ticketInput.skip;
    let limit = ticketInput.limit;

    if (!skip) {
      skip = 0;
    }

    if (!limit) {
      limit = 10;
    }

    fetch(`https://us-central1-bonsai-interview-endpoints.cloudfunctions.net/movieTickets?skip=${skip}&limit=${limit}`)
      .then((response) => {
        const tickets = new Array(response.json());
        tickets.forEach(it => {
          let ticket = new TicketModel(it);
          ticket.saveFields();
        })
      })
      .catch(err => {
        throw new Error(err);
      })
    
    const result = await TicketModel.find({})

    return result;
  }
}
