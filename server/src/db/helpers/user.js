const {
  db,
  helpers: { firstRow },
} = require("../");
const { twitchRequest } = require("../../helpers/api");

const addUser = (id) =>
  db
    .query("SELECT id FROM users WHERE twitch_id = $1", [id])
    .then(({ rows }) => {
      return twitchRequest(`/users?id=${id}`).then(({ data }) => {
        if (data.length > 0) {
          const { login, display_name, profile_image_url } = data[0];

          if (rows.length) {
            return db
              .query(
                "UPDATE users SET display_name = $1, avatar = $2 WHERE twitch_id = $3 RETURNING *",
                [display_name, profile_image_url, id]
              )
              .catch((error) => console.log(error));
          }

          return db.query(
            "INSERT INTO users (username, display_name, avatar, twitch_id) VALUES ($1, $2, $3, $4) RETURNING *",
            [login, display_name, profile_image_url, id]
          );
        }

        throw new Error("No Twitch user with that ID.");
      });
    })
    .then(firstRow);

module.exports = { addUser };
