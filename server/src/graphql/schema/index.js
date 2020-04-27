const { PubSub, makeExecutableSchema } = require("apollo-server-express");
const merge = require("lodash/merge");
const { encodeGlobalId, decodeGlobalId } = require("./encoding");

const {
  db,
  helpers: { firstRow },
} = require("../../db/");

const { types: UserTypes, resolvers: UserResolvers } = require("./user");
const { types: QueueTypes, resolvers: QueueResolvers } = require("./queue");
const { types: ChatTypes, resolvers: ChatResolvers } = require("./chat");
const {
  types: RequestTypes,
  resolvers: RequestResolvers,
} = require("./request");
const {
  types: MessageTypes,
  resolvers: MessageResolvers,
} = require("./message");

const Schema = `
  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }

  interface Node {
    id: ID!
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }

  type RequestEdge {
    cursor: String!
    node: Request
  }

  type RequestConnection {
    edges: [RequestEdge]
    pageInfo: PageInfo
  }
  
  type MessageEdge {
    cursor: String!
    node: Message
  }

  type MessageConnection {
    edges: [MessageEdge]
    pageInfo: PageInfo
  }

  type MessageGroupEdge {
    cursor: String!
    node: MessageGroup
  }

  type MessageGroupConnection {
    edges: [MessageGroupEdge]
    pageInfo: PageInfo
  }
`;

const QueryType = `
  type Query {
    node(id: ID!): Node
  }
`;

const MutationType = `
  type Mutation {
    _empty: String
  }
`;

const SubscriptionType = `
  type Subscription {
    _empty: String
  }
`;

const BaseResolvers = {
  Node: {
    __resolveType: (obj) => obj.__typename,
  },
  Query: {
    node: (parent, args, context) => {
      if (args.id === "queue:Queue") {
        return { id: "queue", __typename: "Queue" };
      }

      const { id, __typename } = decodeGlobalId(args.id);

      return db
        .query(`SELECT * FROM ${__typename.toLowerCase()}s WHERE id = $1`, [id])
        .then(firstRow)
        .then((row) => ({ ...row, __typename }));
    },
  },
};

const pubsub = new PubSub();

const GlobalIDResolvers = {
  Request: RequestResolvers(pubsub),
  Message: MessageResolvers(pubsub),
  MessageGroup: MessageResolvers(pubsub),
  User: UserResolvers,
};

const applyGlobalID = (name, resolver) => ({
  ...resolver,
  [name]: {
    ...resolver[name],
    id: (obj) => encodeGlobalId(obj, name),
  },
});

module.exports = makeExecutableSchema({
  typeDefs: [
    Schema,
    QueryType,
    MutationType,
    SubscriptionType,
    UserTypes,
    QueueTypes,
    ChatTypes,
    RequestTypes,
    MessageTypes,
  ],
  resolvers: merge(
    BaseResolvers,
    QueueResolvers,
    ChatResolvers,
    ...Object.entries(GlobalIDResolvers).map(([name, resolver]) =>
      applyGlobalID(name, resolver)
    )
  ),
});
