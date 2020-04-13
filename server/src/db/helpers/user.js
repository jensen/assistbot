const db = require("../connect");
const { twitchRequest } = require("../../helpers/api");

const addUser = (id) =>
  db
    .query("SELECT * FROM users WHERE twitch_id = $1", [id])
    .then(({ rows }) => {
      return twitchRequest(`/users?id=${id}`).then((data) => {
        if (data.length > 0) {
          const { login, profile_image_url } = data[0];

          if (rows.length) {
            return db.query(
              "UPDATE users SET avatar = $1 WHERE twitch_id = $2 RETURNING *",
              [profile_image_url, id]
            );
          }

          return db.query(
            "INSERT INTO users (username, avatar, twitch_id) VALUES ($1, $2, $3) RETURNING *",
            [login, profile_image_url, id]
          );
        }

        throw new Error("No Twitch user with that ID.");
      });
    })
    .then(({ rows }) => rows[0]);

module.exports = { addUser };
