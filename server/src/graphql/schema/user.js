const {
  db,
  helpers: { allRows, firstRow },
} = require("../../db");
const { addUser } = require("../../db/helpers/request");
const { connectionTo } = require("./connection");

const types = `
  type User implements Node {
    id: ID!
    username: String
    avatar: String
    twitchId: String
    requests(first: Int, after: String, last: Int, before: String): RequestConnection
    messages(first: Int, after: String, last: Int, before: String): MessageConnection
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

  extend type Query {
    users: [User]
    user(id: ID!): User
  }

  extend type Mutation {
    addUser(twitchId: String!): User
  }
`;

const resolvers = {
  Query: {
    users: (parent, args, context, info) =>
      db.query("SELECT * FROM users").then(allRows),
    user: (parent, args, context, info) =>
      db
        .query("SELECT * FROM users WHERE users.id = $1", [args.id])
        .then(firstRow),
  },
  User: {
    requests: (parent, args) => connectionTo("requests", parent.id, args),
    messages: (parent, args) => connectionTo("messages", parent.id, args),
  },
  Mutation: {
    addUser: (parent, { twitchId }, context, info) => addUser(twitchId),
  },
};

module.exports = {
  types,
  resolvers,
};
