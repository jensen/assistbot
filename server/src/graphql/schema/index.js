const db = require("../../db/connect");
const { makeExecutableSchema } = require("apollo-server-express");
const { mergeDeepLeft } = require("ramda");

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
const BaseResolvers = {
  Query: {},
};

module.exports = makeExecutableSchema({
  typeDefs: [QueryType, UserTypes, RequestTypes, MessageTypes],
  resolvers: [UserResolvers, RequestResolvers, MessageResolvers].reduce(
    (all, current) => mergeDeepLeft(all, current),
    BaseResolvers
  ),
});
