require("dotenv").config();

const bodyparser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();

const { addUser } = require("./db/helpers/user");
const { addRequest } = require("./db/helpers/request");

const PORT = process.env.PORT;

const db = require("./db/connect");

app.use(express.static("public"));
app.use(cors());
app.use(bodyparser.json());

app.post("/requests", (request, response) => {
  addUser(request.body.twitchid)
    .then((user) => {
      return addRequest(user.id, request.body.type, request.body.link);
    })
    .then(() => {
      response.json({ success: true });
    })
    .catch((error) => {
      response.json({ success: false, error });
    });
});

app.get("/users", (request, response) => {
  db.query("SELECT * FROM users").then(({ rows }) => response.json(rows));
});

app.get("/users/:id", (request, response) => {
  db.query("SELECT * FROM users WHERE id = $1", [
    request.params.id,
  ]).then(({ rows: [row] }) => response.json(row));
});

app.get("/users/:twitch_id/requests", (request, response) => {
  db.query(
    `
    SELECT requests.id
    FROM requests
    JOIN users ON requests.users_id = users.id
    WHERE users.twitch_id = $1 AND requests.completed_at IS NULL
    `,
    [request.params.twitch_id]
  ).then(({ rows }) => {
    response.json({ exists: rows.length > 0 });
  });
});

app.put("/requests/:id/accepted", (request, response) => {
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

app.put("/requests/:id/completed", (request, response) => {
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

app.get("/requests/:timestamp", (request, response) => {
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

app.get("/requests", (request, response) => {
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

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
