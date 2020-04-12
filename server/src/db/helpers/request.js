const db = require("../connect");

const addRequest = (usersId, type) => {
  return db.query(
    "INSERT INTO requests (users_id, type) VALUES ($1, $2) RETURNING *",
    [usersId, type]
  );
};

module.exports = {
  addRequest,
};
