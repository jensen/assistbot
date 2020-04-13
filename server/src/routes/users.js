const express = require("express");
const db = require("../db/connect");

const router = express.Router();

router.get("/", (request, response) =>
  db.query("SELECT * FROM users").then(({ rows }) => response.json(rows))
);

router.get("/:id", (request, response) =>
  db
    .query("SELECT * FROM users WHERE id = $1", [request.params.id])
    .then(({ rows: [row] }) => response.json(row))
);

router.get("/:twitch_id/requests", (request, response) =>
  db
    .query(
      `
    SELECT requests.id
    FROM requests
    JOIN users ON requests.users_id = users.id
    WHERE users.twitch_id = $1 AND requests.completed_at IS NULL
    `,
      [request.params.twitch_id]
    )
    .then(({ rows }) => response.json({ exists: rows.length > 0 }))
);

module.exports = router;
