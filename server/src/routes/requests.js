const express = require("express");
const db = require("../db/connect");
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
