import { ObjectId } from 'mongodb';
import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class MovieInput {
  @Field()
  public id: ObjectId
}


@InputType()
export class SaveMoviesInput {
  @Field(() => Int)
  public limit: number
}
