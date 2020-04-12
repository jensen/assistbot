const pg = require("pg");
const client = new pg.Client();

client.connect();

module.exports = client;
