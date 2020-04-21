const {
  db,
  helpers: { firstRow },
} = require("../");

const addRequest = (userId, type, description, link) =>
  db
    .query(
      "INSERT INTO requests (users_id, type, description, link) VALUES ($1, $2, $3, $4) RETURNING *",
      [userId, type, description, link]
    )
    .then(firstRow);

module.exports = {
  addRequest,
};
