import { ApolloServer } from "apollo-server";
import { ObjectId } from "mongodb";
import { connect } from "mongoose";
import * as path from "path";
import "reflect-metadata";
import { buildSchema } from "type-graphql";

import { ObjectIdScalar } from "./objectId.scalar";
import { MovieResolver } from "./resolvers/Movie.resolver";
import { TicketResolver } from './resolvers/Ticket.resolver';
import typegooseMiddleware from "./typegooseMiddleware";
import { PORT, DB_URL } from './helpers/constants';

const main = async () => {
  try {
    await connect( DB_URL,{ useNewUrlParser: true });
  } catch (mongoConnectError) {
    console.error(mongoConnectError)
  }
  
  try {
    const schema = await buildSchema({
      resolvers: [MovieResolver, TicketResolver],
      emitSchemaFile: path.resolve(__dirname, "schema.gql"),
      globalMiddlewares: [typegooseMiddleware],
      scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
    })
    const server = new ApolloServer({ schema, context: {} })
    const { url } = await server.listen(PORT)
    console.log(`GraphQL Playground running at ${url}`)
  } catch (apolloError) {
    console.error(apolloError)
  }
}

main();
