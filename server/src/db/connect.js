const pg = require("pg");
const client = new pg.Client();

(async function () {
  try {
    await client.connect();
  } catch (error) {
    console.log("Error connecting to the database: ", error);
  }
})();

module.exports = client;
