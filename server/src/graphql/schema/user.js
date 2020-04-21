const {
  db,
  helpers: { allRows, firstRow },
} = require("../../db");
const { addUser } = require("../../db/helpers/request");

const types = `
  extend type Query {
    users: [User]
    user(id: ID!): User
  }

  type User {
    id: ID!
    username: String
    avatar: String
    twitchId: String
  }

  extend type Mutation {
    addUser(twitchId: String!): User
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
  Mutation: {
    addUser: (parent, { twitchId }, context, info) => addUser(twitchId),
  },
};

module.exports = {
  types,
  resolvers,
};
