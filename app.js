import { TicketResolver } from './source/resolvers';

const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');

const graphqlSchema = require('./source/schema');

const app = express();

app.use(bodyParser.json()); //application/json

app.use('/graphql', graphqlHttp({
  schema: graphqlSchema,
  rootValue: TicketResolver,
  graphiql: true
}));


app.listen(8080, () => {
  console.log('Listening on port 8080');
});
