const path = require("path");
const dotenv = require("dotenv");
const http = require("http");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const bodyparser = require("body-parser");
const express = require("express");
const cors = require("cors");

const { ApolloServer } = require("apollo-server-express");
const snakeCase = require("lodash/snakeCase");

const app = express();

const userRoutes = require("./routes/users");
const requestRoutes = require("./routes/requests");
const messageRoutes = require("./routes/messages");

const PORT = process.env.PORT;

app.use(cors());
app.use(express.static("public"));
app.use(bodyparser.json());

const apollo = new ApolloServer({
  schema: require("./graphql/schema"),
  fieldResolver: (source, args, contextValue, info) => {
    if (typeof source === "object" || typeof source === "function") {
      const property = source[snakeCase(info.fieldName)];
      return typeof property === "function"
        ? source[snakeCase(info.fieldName)](args, contextValue, info)
        : property;
    }
  },
});

app.use("/users", userRoutes);
app.use("/requests", requestRoutes);
app.use("/messages", messageRoutes);

const server = http.createServer(app);

apollo.applyMiddleware({ app });
apollo.installSubscriptionHandlers(server);

server.listen(PORT, "0.0.0.0", () => console.log(`Listening on port ${PORT}`));
