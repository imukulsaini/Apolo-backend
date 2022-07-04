const express = require("express");

const { ApolloServer, gql } = require("apollo-server-express");
const { initializeDBConnection } = require("./db/db.connect.js");

const { typeDefs } = require("./typeDefs.js");
const { resolvers } = require("./resolvers.js");

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  initializeDBConnection();

  await server.start();
  server.applyMiddleware({ app: app });

  app.use((req, res) => {
    res.send("hello from express nodejs server");
  });

  app.listen(3000, () => console.log("app is listening "));
}

startServer();
