const express = require("express");
const db = require("../db/connect");
const { addUser } = require("../db/helpers/user");
const { addMessage } = require("../db/helpers/message");

const router = express.Router();

router.get("/", (request, response) =>
  db
    .query(
      `
      SELECT
        messages.id AS id,
        messages.message AS message,
        messages.created_at AS date,
        users.username AS username,
        users.avatar AS avatar
      FROM messages
      JOIN users ON users.id = messages.users_id;
    `
    )
    .then(({ rows }) => response.json(rows))
);

router.get("/:timestamp", (request, response) => {
  db.query(
    `
      SELECT
        messages.id AS id,
        messages.message AS message,
        messages.created_at AS date,
        users.username AS username,
        users.avatar AS avatar
      FROM messages
      JOIN users ON users.id = messages.users_id
      WHERE messages.created_at::timestamp > to_timestamp($1) AT TIME ZONE 'UTC';
    `,
    [request.params.timestamp]
  ).then(({ rows }) => response.json(rows));
});

router.post("/", (request, response) => {
  addUser(request.body.twitchid)
    .then((user) => addMessage(user.id, request.body.message))
    .then(() => response.json({ success: true }))
    .catch((error) => response.json({ success: false, error }));
});

module.exports = router;
