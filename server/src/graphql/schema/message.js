const db = require("../../db/connect");
const { allRows, firstRow } = require("../../utils/array");

const types = `
  extend type Query {
    messages(from: Int): [Message]
    message(id: ID!): Message
  }

  type Message {
    id: ID!
    message: String
    emotes: String
    createdAt: String
    user: User
  }
`;

const resolvers = {
  Query: {
    messages: (parent, args, context, info) => {
      if (args.from) {
        return db
          .query(
            "SELECT * FROM messages WHERE messages.created_at::timestamp > to_timestamp($1) AT TIME ZONE 'UTC'",
            [args.from]
          )
          .then(allRows);
      }

      return db.query("SELECT * FROM messages").then(allRows);
    },
    message: (parent, args, context, info) =>
      db
        .query("SELECT * FROM messages WHERE messages.id = $1", [args.id])
        .then(firstRow),
  },
  Message: {
    user: (parent, args, context, info) =>
      db
        .query("SELECT * FROM users WHERE users.id = $1", [parent.users_id])
        .then(firstRow),
  },
};

module.exports = {
  types,
  resolvers,
};
