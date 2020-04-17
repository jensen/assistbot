const db = require("../connect");

const addRequest = (usersId, type, description, link) => {
  return db.query(
    "INSERT INTO requests (users_id, type, description, link) VALUES ($1, $2, $3, $4) RETURNING *",
    [usersId, type, description, link]
  );
};

module.exports = {
  addRequest,
};
