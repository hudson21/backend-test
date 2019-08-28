import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql'
import {
  arrayProp as ArrayProperty,
  ModelType,
  prop as Property,
  staticMethod as StaticMethod,
  Typegoose,
} from 'typegoose'

import { Ticket } from './ticket'

@ObjectType()
export class Movie extends Typegoose {
  @StaticMethod
  public static findById(this: ModelType<Movie>, id: any) {
    return this.findOne({ _id: id })
  }

  @Field()
  public readonly _id: ObjectId

  @Field()
  @Property({ required: true })
  public title: string

  @Field(() => String)
  @Property({ required: true })
  public year: string

  @Field(() => String)
  @Property({ required: true })
  public rated: string

  @Field(() => String)
  @Property({ required: true })
  public released: string

  @Field(() => String)
  @Property({ required: true })
  public runtime: string

  @Field(() => [String])
  @ArrayProperty({ items: String, default: [] })
  public genre: string[]

  @Field(() => String)
  @Property({ required: true })
  public country: string

  @Field(() => [Ticket])
  @Property({ ref: Ticket })
  public tickets: Ticket[]
}

export const MovieModel = new Movie().getModelForClass(Movie);
export default MovieModel;
