const db = require("../../db/connect");
const { allRows, firstRow } = require("../../utils/array");

const types = `
  extend type Query {
    requests(from: Int): [Request]
    request(id: ID!): Request
  }

  type Request {
    id: ID!
    description: String
    type: String
    link: String
    createdAt: String
    updatedAt: String
    acceptedAt: String
    completedAt: String
    user: User
  }
`;

const resolvers = {
  Query: {
    requests: (parent, args, context, info) => {
      if (args.from) {
        return db
          .query(
            "SELECT * FROM requests WHERE requests.updated_at::timestamp > to_timestamp($1) AT TIME ZONE 'UTC'",
            [args.from]
          )
          .then(allRows);
      }

      return db.query("SELECT * FROM requests").then(allRows);
    },
    request: (parent, args, context, info) =>
      db
        .query("SELECT * FROM requests WHERE requests.id = $1", [args.id])
        .then(firstRow),
  },
  Request: {
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
