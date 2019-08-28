import { ObjectId } from "mongodb"
import { Field, Float, InputType, Int } from "type-graphql"

import { Ticket } from "../../entities/Ticket"

@InputType()
export class TicketInput {
  @Field()
  public id: ObjectId
}

@InputType()
export class SaveTicketsInput {
  @Field(() => Int)
  skip: number

  @Field(() => Int)
  limit: number
}

@InputType()
export class ListTicketsWithPagination {
  @Field(() => Int)
  page: number

  @Field(() => Int)
  limit: number
}


@InputType()
export class ListTicketsInput {
  @Field(() => Date)
  public cursor: Date

  @Field(() => Int)
  public limit: number
}

@InputType()
export class AddTicketInput implements Partial<Ticket> {
  @Field()
  public title: string

  @Field(() => [String])
  public genre: string[]

  @Field(() => Float)
  public price: number

  @Field(() => Int)
  public inventory: number

  @Field()
  public image: string

  @Field()
  public date: Date
}
