const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const bodyparser = require("body-parser");
const express = require("express");
const cors = require("cors");

const { ApolloServer } = require("apollo-server-express");

const app = express();
const apollo = new ApolloServer({ schema: require("./graphql/schema") });

const userRoutes = require("./routes/users");
const requestRoutes = require("./routes/requests");
const messageRoutes = require("./routes/messages");

const PORT = process.env.PORT;

app.use(cors());
app.use(express.static("public"));
app.use(bodyparser.json());

apollo.applyMiddleware({ app });

app.use("/users", userRoutes);
app.use("/requests", requestRoutes);
app.use("/messages", messageRoutes);

app.listen(PORT, "0.0.0.0", () => console.log(`Listening on port ${PORT}`));
