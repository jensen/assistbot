const db = require("../connect");

const addRequest = (usersId, type, link) => {
  return db.query(
    "INSERT INTO requests (users_id, type, link) VALUES ($1, $2, $3) RETURNING *",
    [usersId, type, link]
  );
};

module.exports = {
  addRequest,
};
