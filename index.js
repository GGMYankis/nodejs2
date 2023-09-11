const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./gql/schema");
const resolvers = require("./gql/resolver");
const jwt = require("jsonwebtoken");
const colors = require("colors");
const jwtDecode = require("jwt-decode");
require("dotenv").config({ path: ".env" });


mongoose
  .connect(process.env.BBDD)
  .then(() => {
    console.log("conexion con exito".blue);
    server();
  })
  .catch((error) => {
    console.log("Error de conexion :" + error);
  });

function server() {
  const configServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const token = req.headers.authorization;
      if (token) {
        try {
          const user = jwtDecode(token);
          return {
            user,
          };
        } catch (error) {
          console.log("#### ERROR ####");
          throw new Error("Token invalido");
        }
      }
    },   
  });

  configServer.listen({port: process.env.PORT || 4000}).then(({ url }) => {
    console.log("Graghql in port : " + url );
  });  
}
