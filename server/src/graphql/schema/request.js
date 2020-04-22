const {
  db,
  helpers: { allRows, firstRow },
} = require("../../db");
const { addRequest } = require("../../db/helpers/request");

const types = `
  extend type Query {
    requests(from: Int): [Request]
    request(id: ID, filter: String): Request
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
    messages: [Message]
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
    request: (parent, args, context, info) => {
      if (args.filter) {
        if (args.filter === "accepted") {
          return db
            .query(
              "SELECT * FROM requests WHERE requests.accepted_at IS NOT NULL AND requests.completed_at IS NULL"
            )
            .then(firstRow);
        }
      }

      if (args.id) {
        return db
          .query("SELECT * FROM requests WHERE requests.id = $1", [args.id])
          .then(firstRow);
      }

      return null;
    },
  },
  Request: {
    user: (parent, args, context, info) =>
      db
        .query("SELECT * FROM users WHERE users.id = $1", [parent.users_id])
        .then(firstRow),

    messages: (parent, args, context, info) =>
      db
        .query(
          `
          SELECT 
            messages.id AS id,
            messages.message,
            messages.emotes,
            messages.created_at
          FROM messages
          JOIN users ON users.id = messages.users_id
          JOIN requests ON users.id = requests.users_id
          WHERE users.id = $1 AND requests.id = $2 AND messages.created_at > requests.accepted_at AND requests.completed_at IS NULL
          ORDER BY messages.created_at ASC
        `,
          [parent.users_id, parent.id]
        )
        .then(allRows),
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
