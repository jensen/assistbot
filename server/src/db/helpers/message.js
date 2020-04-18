const db = require("../connect");

const addMessage = (usersId, message) =>
  db.query(
    "INSERT INTO messages (users_id, message) VALUES ($1, $2) RETURNING *",
    [usersId, message]
  );

module.exports = {
  addMessage,
};
