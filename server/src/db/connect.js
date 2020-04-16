const pg = require("pg");
const client = new pg.Client();

/*
  Overwrite the parser for timestamp,
  this way it does not use new Date,
  and covert from UTC to local on
  the server.
*/
pg.types.setTypeParser(1114, (stringValue) => stringValue);

(async function () {
  try {
    await client.connect();
  } catch (error) {
    console.log("Error connecting to the database: ", error);
  }
})();

module.exports = client;
