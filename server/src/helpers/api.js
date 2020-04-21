const axios = require("axios");

axios.defaults.baseURL = process.env.TWITCH_BASEURL;

const twitchRequest = (url) =>
  axios({
    method: "get",
    url,
    headers: {
      "Client-ID": process.env.TWITCH_CLIENTID,
    },
  }).then((response) => response.data);

module.exports = {
  twitchRequest,
};
