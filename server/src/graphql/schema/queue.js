const { connectionTo } = require("./connection");

const types = `
  type Queue implements Node {
    id: ID!
    requests(first: Int, after: String, last: Int, before: String, status: String): RequestConnection
  }

  extend type Query {
    queue: Queue
  }
`;

const resolvers = {
  Query: {
    queue: () => ({}),
  },
  Queue: {
    id: () => "queue:Queue",
    requests: (parent, args) => {
      if (args.status === "accepted") {
        return connectionTo(
          "requests",
          "SELECT * FROM requests WHERE accepted_at IS NOT NULL AND completed_at IS NULL",
          [],
          args
        );
      }

      return connectionTo(
        "requests",
        "SELECT * FROM requests WHERE $1 = $1",
        [1],
        args
      );
    },
  },
};

module.exports = {
  types,
  resolvers,
};
