const { db } = require("../../db");
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

const BaseResolvers = {
  Query: {},
};

module.exports = makeExecutableSchema({
  typeDefs: [QueryType, MutationType, UserTypes, RequestTypes, MessageTypes],
  resolvers: merge(
    BaseResolvers,
    UserResolvers,
    RequestResolvers,
    MessageResolvers
  ),
});
