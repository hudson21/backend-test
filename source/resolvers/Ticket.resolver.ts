import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { ObjectId } from "mongodb";
import TicketModel, { Ticket } from "../entities/ticket"

import { AddTicketInput, ListTicketsInput, TicketInput, SaveTicketsInput } from "./types/Ticket.input"
import { fetch } from "apollo-server-env";

const BASE_URL = "https://us-central1-bonsai-interview-endpoints.cloudfunctions.net/movieTickets";

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

  @Mutation(() => [Ticket])
  public async saveTickets(@Arg("input") ticketInput: SaveTicketsInput): Promise<Ticket[]> {
    let skip = ticketInput.skip || 0;
    let limit = ticketInput.limit;
    let url = `${BASE_URL}?skip=${skip}&limit=${limit}`;
    console.log("url", url);

    //await TicketModel.deleteMany({});
    // URL should be a constant
    await fetch(url)
      .then(response => response.json())
      .then(tickets => {
        tickets.map((it:any) => {
          console.log("inserting", it);
          const ticket = new TicketModel({
            title: it.title,
            genre: it.genre,
            price: it.price,
            inventory: it.inventory,
            imageUrl: it.image,
            date: it.date
          })
          ticket.saveFields()
            .then((tick) => {
              console.log("inserted", tick.title);
            })
            .catch((err) => {
              console.log("error", err);
            })
        });
      })
      .catch(err => {
        throw new Error(err);
      })
    
    const result = await TicketModel.find({}) 

    return result;
  }
}
