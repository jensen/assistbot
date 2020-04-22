const {
  db,
  helpers: { firstRow },
} = require("../");

const addMessage = (userId, message, emotes) =>
  db
    .query(
      "INSERT INTO messages (users_id, message, emotes) VALUES ($1, $2, $3) RETURNING *",
      [userId, message, emotes]
    )
    .then(firstRow);

module.exports = {
  addMessage,
};
