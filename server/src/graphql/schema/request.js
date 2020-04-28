const {
  db,
  helpers: { allRows, firstRow, toCamelCase },
} = require("../../db");
const { decodeGlobalId } = require("./encoding");
const { offsetToCursor } = require("./connection");
const { addRequest } = require("../../db/helpers/request");

const types = `
  type Request implements Node {
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

  extend type Query {
    requests(from: Int): [Request]
    request(id: ID, filter: String): Request
  }

  input AddRequestInput {
    twitchId: ID!
    type: String
    description: String
    link: String
  }

  type AddRequestPayload {
    request: RequestEdge
  }

  input UpdateRequestInput {
    id: ID!
  }

  type UpdateRequestPayload {
    request: Request
  }

  extend type Mutation {
    addRequest(input: AddRequestInput!): AddRequestPayload
    acceptRequest(id: ID!): Request
    completeRequest(id: ID!): Request
  }

  extend type Subscription {
    addRequest: RequestEdge
  }
`;

const REQUEST_ADDED = "REQUEST_ADDED";

module.exports = {
  types,
  resolvers: (pubsub) => ({
    Query: {
      requests: (parent, args, context) => {
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
      request: (parent, args, context) => {
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
      user: (parent, args, context) =>
        db
          .query("SELECT * FROM users WHERE users.id = $1", [
            parent.users_id || parent.usersId,
          ])
          .then(firstRow),
      messages: (parent, args, context) =>
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
    Subscription: {
      addRequest: {
        subscribe: () => pubsub.asyncIterator(REQUEST_ADDED),
      },
    },
    Mutation: {
      addRequest: (
        parent,
        { input: { twitchId, type, description, link } },
        context
      ) =>
        addUser(twitchId).then((user) =>
          addRequest(user.id, type, description, link).then((data) => {
            const { usersId, ...request } = data;

            console.log(request);

            const edge = {
              cursor: offsetToCursor(request.id),
              node: {
                ...toCamelCase(request),
              },
            };

            pubsub.publish(REQUEST_ADDED, { addRequest: edge });

            return { request: edge };
          })
        ),

      acceptRequest: (parent, { input: { id } }, context, info) =>
        db
          .query(
            `
            UPDATE requests
            SET accepted_at = now() AT TIME ZONE 'utc'
            WHERE id = $1
            RETURNING *
          `,
            [decodeGlobalId(id).id]
          )
          .then(firstRow),
      completeRequest: (parent, { input: { id } }, context, info) =>
        db
          .query(
            `
          UPDATE requests
          SET completed_at = now() AT TIME ZONE 'utc'
          WHERE id = $1
          RETURNING *
        `,
            [decodeGlobalId(id).id]
          )
          .then(firstRow),
    },
  }),
};
