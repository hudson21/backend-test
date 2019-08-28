import { ObjectId } from "mongodb";
import { fetch } from "apollo-server-env";
import TicketModel, { Ticket } from "../entities/ticket";
import { AddTicketInput, ListTicketsInput, TicketInput, SaveTicketsInput, ListTicketsWithPagination } from "../resolvers/types/Ticket.input";
import { InputType } from "type-graphql";
import transformGenres from '../helpers/transformGenres';
import { BASE_URL } from '../helpers/constants';


export async function listTickets(input: ListTicketsInput): Promise<Ticket[]> {
  const { limit, cursor } = input;
  return TicketModel
    .find({ date: { $lt: cursor.getTime() } })
    .sort({ date: 'desc' })
    .limit(limit)
}

export async function listTicketsWithPagination(input: ListTicketsWithPagination): Promise<Ticket[]> {
  let limit = input.limit || 10;
  let page = input.page || 0;
  
  return TicketModel
    .find({})
    .sort({ date: 'desc' })
    .skip((page - 1) * limit)
    .limit(limit)
}

export async function ticket(input: TicketInput): Promise<Ticket> {
  const ticket = await TicketModel.findById(input.id);
  if (!ticket) {
    throw new Error("No ticket found!");
  }
  return ticket;
}

export async function addTicket(input: AddTicketInput): Promise<Ticket> {
  const ticket = new TicketModel(input)
  return ticket.saveFields();
}

export async function saveTickets(input: SaveTicketsInput): Promise<Ticket[]> {
  let skip = input.skip || 0;
  let limit = input.limit || 1000; 
  const url = `${BASE_URL}?skip=${skip}&limit=${limit}`;

  try {
    await TicketModel.deleteMany({});
    const tickets = await fetch(url).then(response => response.json());

    tickets.map((it: any) => {
      const ticket = new TicketModel({
          title: it.title,
          genre: transformGenres(it.genre || ''),
          price: it.price,
          inventory: it.inventory,
          image: it.image,
          date: it.date,
      });
      if (ticket.title && ticket.price && ticket.inventory && ticket.image && ticket.date) {
        ticket.saveFields();
      } 
    });

    return await TicketModel.find({});

  } catch (error) {
    throw new Error(error);
  }
}
