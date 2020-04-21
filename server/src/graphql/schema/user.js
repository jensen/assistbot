const db = require("../../db/connect");
const { allRows, firstRow } = require("../../utils/array");

const types = `
  extend type Query {
    users: [User]
    user(id: ID!): User
  }

  type User {
    id: ID!
    username: String
    avatar: String
    twitchID: String
  }
`;

const resolvers = {
  Query: {
    users: (parent, args, context, info) =>
      db.query("SELECT * FROM users").then(allRows),
    user: (parent, args, context, info) =>
      db
        .query("SELECT * FROM users WHERE users.id = $1", [args.id])
        .then(firstRow),
  },
};

module.exports = {
  types,
  resolvers,
};
