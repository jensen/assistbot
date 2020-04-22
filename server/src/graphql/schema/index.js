const { makeExecutableSchema } = require("apollo-server-express");
const merge = require("lodash/merge");

const { types: UserTypes, resolvers: UserResolvers } = require("./user");
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
`;

const QueryType = `
  type Query {
    _empty: String
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

const BaseResolvers = {};

module.exports = makeExecutableSchema({
  typeDefs: [
    Schema,
    QueryType,
    MutationType,
    SubscriptionType,
    UserTypes,
    RequestTypes,
    MessageTypes,
  ],
  resolvers: merge(
    BaseResolvers,
    UserResolvers,
    RequestResolvers,
    MessageResolvers
  ),
});
