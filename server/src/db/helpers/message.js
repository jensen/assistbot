const db = require("../connect");

const addMessage = (usersId, message, emotes) => {
  db.query(
    "INSERT INTO messages (users_id, message, emotes) VALUES ($1, $2, $3) RETURNING *",
    [usersId, message, emotes]
  );
};

module.exports = {
  addMessage,
};
