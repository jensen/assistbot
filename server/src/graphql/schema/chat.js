const { connectionTo } = require("./connection");

const types = `
  type Chat {
    groups(first: Int, after:String, last: Int, before: String): MessageGroupConnection
    messages(first: Int, after: String, last: Int, before: String): MessageConnection
  }

  extend type Query {
    chat: Chat
  }
`;

const resolvers = {
  Query: {
    chat: () => ({}),
  },
  Chat: {
    groups: (parent, args) =>
      connectionTo(
        "groups",
        `${messageGroupQuery} SELECT * FROM groups`,
        [],
        args
      ).then((results) => ({
        ...results.page_info,
        edges: results.edges.map(({ cursor, node }) => ({
          cursor,
          node: {
            id: node.id,
            user: {
              id: node.users_id,
              username: node.username,
              avatar: node.avatar,
            },
            messages: node.ids.map((id, index) => ({
              id,
              message: node.messages[index],
              emotes: node.emotes[index],
              created_at: node.creation_dates[index],
            })),
          },
        })),
      })),
    messages: (parent, args) =>
      connectionTo("messages", "SELECT * FROM messages", [], args),
  },
};

module.exports = {
  types,
  resolvers,
};

const messageGroupQuery = `
WITH group_values AS (
  SELECT messages.users_id            AS users_id,
         messages.id         AS message_id,
         messages.message    AS message_message,
         messages.emotes     AS message_emotes,
         messages.created_at AS messages_created_at,
         CASE
             WHEN row_number() OVER (ORDER BY messages.created_at ASC) = 1 THEN 1
             WHEN messages.users_id IS DISTINCT FROM lag(messages.users_id) OVER (ORDER BY messages.created_at ASC) THEN 1
             ELSE 0
             END             AS group_value
  FROM messages
  ORDER BY messages.created_at
),
   group_sums AS (
       SELECT users_id,
              message_id,
              message_message,
              message_emotes,
              messages_created_at,
              SUM(group_value) OVER (PARTITION BY users_id ORDER BY messages_created_at) AS group_sum
       FROM group_values
       GROUP BY users_id, message_id, message_message, message_emotes, messages_created_at, group_value
       ORDER BY messages_created_at
   ),
   groups_by_date AS (
       SELECT group_sums.users_id,
              ARRAY_AGG(group_sums.message_id) AS ids,
              ARRAY_AGG(group_sums.message_message)    AS messages,
              ARRAY_AGG(group_sums.message_emotes)     AS emotes,
              ARRAY_AGG(group_sums.messages_created_at) AS creation_dates,
              MIN(group_sums.messages_created_at)       AS created_at
       FROM group_sums
       GROUP BY group_sums.users_id, group_sums.group_sum
       ORDER BY MIN(group_sums.messages_created_at)
   ),
   groups AS (
       SELECT row_number() OVER (ORDER BY created_at) AS id,
              users.id as users_id,
              users.username as username,
              users.avatar as avatar,
              groups_by_date.ids,
              groups_by_date.messages,
              groups_by_date.emotes,
              groups_by_date.creation_dates,
              groups_by_date.created_at
       FROM groups_by_date
       JOIN users ON users.id = users_id
   )
`;
