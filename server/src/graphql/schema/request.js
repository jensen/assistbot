const {
  db,
  helpers: { allRows, firstRow },
} = require("../../db");
const { addRequest } = require("../../db/helpers/request");

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

  extend type Mutation {
    addRequest(userId: ID!, type: String, description: String, link: String): Request
    acceptRequest(id: ID!): Request
    completeRequest(id: ID!): Request
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
  Mutation: {
    addRequest: (parent, { userId, type, description, link }, context, info) =>
      addRequest(userId, type, description, link),
    acceptRequest: (parent, { id }, context, info) =>
      db
        .query(
          `
        UPDATE requests
        SET accepted_at = now() AT TIME ZONE 'utc'
        WHERE id = $1
        RETURNING *
      `,
          [id]
        )
        .then(firstRow),
    completeRequest: (parent, { id }, context, info) =>
      db
        .query(
          `
        UPDATE requests
        SET completed_at = now() AT TIME ZONE 'utc'
        WHERE id = $1
        RETURNING *
      `,
          [id]
        )
        .then(firstRow),
  },
};

module.exports = {
  types,
  resolvers,
};
