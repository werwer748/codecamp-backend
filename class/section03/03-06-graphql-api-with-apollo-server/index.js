import { ApolloServer } from "@apollo/server"; // express와 같은 역할
import { startStandaloneServer } from "@apollo/server/standalone"; // listen

const typeDefs = `#graphql
    type Query {
        qqq: String
    }
`;

const resolvers = {
  Query: {
    qqq: () => {
      return "Hello Apollo Server!, Hello GraphQL!";
    },
  },
  // Mutation: {},
};

const server = new ApolloServer({
  typeDefs, // swagger
  resolvers, // api
});

startStandaloneServer(server);
