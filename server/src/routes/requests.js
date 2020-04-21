const express = require("express");
const { db } = require("../db");
const { addUser } = require("../db/helpers/user");
const { addRequest } = require("../db/helpers/request");

const router = express.Router();

router.get("/", (request, response) => {
  db.query(
    `
      SELECT
        requests.id,
        requests.description,
        requests.type,
        requests.link,
        requests.created_at,
        requests.accepted_at,
        requests.completed_at,
        users.username,
        users.avatar
      FROM requests
      JOIN users ON users.id = requests.users_id
    `
  ).then(({ rows }) => response.json(rows));
});

router.get("/:timestamp", (request, response) => {
  db.query(
    `
      SELECT
        requests.id,
        requests.description,
        requests.link,
        requests.type,
        requests.created_at,
        requests.accepted_at,
        requests.completed_at,
        users.username,
        users.avatar
      FROM requests
      JOIN users ON users.id = requests.users_id
      WHERE requests.updated_at::timestamp > to_timestamp($1) AT TIME ZONE 'UTC';
    `,
    [request.params.timestamp]
  ).then(({ rows }) => response.json(rows));
});

router.get("/:id/messages", (request, response) => {
  return db
    .query(
      `
    SELECT 
      messages.id,
      messages.message,
      users.username,
      users.avatar
    FROM requests
    JOIN users ON users.id = requests.users_id
    JOIN messages ON messages.users_id = requests.users_id
    WHERE requests.id = $1 AND messages.created_at > requests.accepted_at AND requests.completed_at IS NULL
    `,
      [request.params.id]
    )
    .then(({ rows }) => response.json(rows));
});

router.get("/:id/messages/:timestamp", (request, response) => {
  return db
    .query(
      `
    SELECT 
      messages.id,
      messages.message,
      users.username,
      users.avatar
    FROM requests
    JOIN users ON users.id = requests.users_id
    JOIN messages ON messages.users_id = requests.users_id
    WHERE
      requests.id = $1
    AND
      messages.created_at > requests.accepted_at
    AND
      requests.completed_at IS NULL
    AND
      messages.created_at::timestamp > to_timestamp($2) AT TIME ZONE 'UTC'
    `,
      [request.params.id, request.params.timestamp]
    )
    .then(({ rows }) => response.json(rows));
});

router.post("/", (request, response) => {
  addUser(request.body.twitchid)
    .then((user) =>
      addRequest(
        user.id,
        request.body.type,
        request.body.description,
        request.body.link
      )
    )
    .then(() => response.json({ success: true }))
    .catch((error) => response.json({ success: false, error }));
});

router.get("/:id/messages", (request, response) =>
  db
    .query(
      `
  SELECT messages.id
  `,
      []
    )
    .then(({ rows }) => response.json(rows))
);

router.put("/:id/accepted", (request, response) => {
  db.query(
    `
      UPDATE requests
      SET accepted_at = now() AT TIME ZONE 'utc'
      WHERE id = $1
      RETURNING *
    `,
    [request.params.id]
  ).then(({ rows }) => response.json(rows[0]));
});

router.put("/:id/completed", (request, response) => {
  db.query(
    `
      UPDATE requests
      SET completed_at = now() AT TIME ZONE 'utc'
      WHERE id = $1
      RETURNING *
    `,
    [request.params.id]
  ).then(({ rows }) => response.json(rows[0]));
});

module.exports = router;
