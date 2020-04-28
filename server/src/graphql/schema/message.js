const {
  db,
  helpers: { allRows, firstRow, toCamelCase },
} = require("../../db");
const { offsetToCursor } = require("./connection");
const { addUser } = require("../../db/helpers/user");
const { addMessage } = require("../../db/helpers/message");

const types = `
  type Message implements Node {
    id: ID!
    message: String
    emotes: String
    createdAt: String
    user: User
  }

  type MessageGroup implements Node {
    id: ID!
    user: User
    messages: [Message]
  }

  extend type Query {
    messages(from: Int): [Message]
    message(id: ID!): Message
  }

  input AddMessageInput {
    twitchId: ID!
    message: String
    emotes: String
  }

  type AddMessagePayload {
    message: MessageEdge
  }

  extend type Mutation {
    addMessage(input: AddMessageInput!): AddMessagePayload
  }

  extend type Subscription {
    addMessage: MessageEdge
  }
`;

const MESSAGE_ADDED = "MESSAGE_ADDED";

module.exports = {
  types,
  resolvers: (pubsub) => ({
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
          .query("SELECT * FROM users WHERE users.id = $1", [
            parent.users_id || parent.usersId,
          ])
          .then(firstRow)
          .then((user) =>
            info.operation.operation === "subscription"
              ? toCamelCase(user)
              : user
          ),
    },
    Subscription: {
      addMessage: {
        subscribe: () => pubsub.asyncIterator(MESSAGE_ADDED),
      },
    },
    Mutation: {
      addMessage: (
        parent,
        { input: { twitchId, message, emotes } },
        context,
        info
      ) =>
        addUser(twitchId).then((user) =>
          addMessage(user.id, message, emotes).then((data) => {
            const { usersId, ...message } = data;

            const edge = {
              cursor: offsetToCursor(message.id),
              node: {
                ...toCamelCase({
                  ...message,
                }),
              },
            };

            pubsub.publish(MESSAGE_ADDED, { addMessage: edge });

            return {
              message: edge,
            };
          })
        ),
    },
  }),
};
