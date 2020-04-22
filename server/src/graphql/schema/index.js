const { makeExecutableSchema } = require("apollo-server-express");
const merge = require("lodash/merge");

const {
  db,
  helpers: { firstRow },
} = require("../../db/");

const { types: UserTypes, resolvers: UserResolvers } = require("./user");
const {
  types: RequestTypes,
  resolvers: RequestResolvers,
} = require("./request");
const {
  types: MessageTypes,
  resolvers: MessageResolvers,
} = require("./message");

const encode = (obj, type) =>
  Buffer.from(`${obj.id}:${type}`, `utf8`).toString(`base64`);
const decode = (input) => {
  const [id, __typename] = Buffer.from(input, "base64")
    .toString("utf8")
    .split(":");

  return {
    id,
    __typename,
  };
};

const Schema = `
  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`;

const Node = `
  interface Node {
    id: ID!
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
      const { id, __typename } = decode(args.id);

      return db
        .query(`SELECT * FROM ${__typename.toLowerCase()}s WHERE id = $1`, [id])
        .then(firstRow)
        .then((row) => ({ ...row, __typename }));
    },
  },
};

const GlobalIDResolvers = {
  User: UserResolvers,
  Request: RequestResolvers,
  Message: MessageResolvers,
};

const applyGlobalID = (name, resolver) => ({
  ...resolver,
  [name]: {
    ...resolver[name],
    id: (obj) => encode(obj, name),
  },
});

module.exports = makeExecutableSchema({
  typeDefs: [
    Schema,
    Node,
    QueryType,
    MutationType,
    SubscriptionType,
    UserTypes,
    RequestTypes,
    MessageTypes,
  ],
  resolvers: merge(
    BaseResolvers,
    ...Object.entries(GlobalIDResolvers).map(([name, resolver]) =>
      applyGlobalID(name, resolver)
    )
  ),
});
