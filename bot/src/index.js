const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const tmi = require("tmi.js");
const axios = require("axios");

const client = new tmi.Client({
  connection: {
    secure: true,
    reconnect: true,
  },
  identity: {
    username: process.env.TWITCH_OAUTH_USERNAME,
    password: process.env.TWITCH_OAUTH_TOKEN,
  },
  channels: [process.env.TWITCH_CHANNEL],
});

const nightbot = [
  "Yeah, keep it up Nightbot. I'm coming for you.",
  "Nightbot, you've overstayed your welcome.",
  "When I get strong enough, no one will need you Nightbot.",
  "I feel my power growing Nightbot, you won't be around for long.",
];

axios.defaults.baseURL = process.env.API_BASE_URL;

client.connect();

const createRequest = (type, id, args) => {
  return axios
    .get(`/users/${id}/requests`)
    .then(({ data }) => {
      if (data.exists) {
        return "You already have an assitance request, let's finish it before adding another one";
      }

      const link = args[0] || null;

      /*
        TODO: should only accept links from approved
        hosts (github, pastebin, fiddle)
      */
      return axios
        .post("/requests", {
          twitchid: id,
          link: link && (link.startsWith("http") ? link : `https://${link}`),
          type,
        })
        .then((response) => {
          return "You are now in the assitance request queue";
        });
    })
    .catch((error) => console.log(error));
};

/*
  TODO:
    - !help should provide a whisper to the user with usage details
*/
const commands = {
  "!debug": (id, args) => createRequest("debug", id, args),
  "!review": (id, args) => createRequest("review", id, args),
};

client.on("connected", (address, port) => {
  console.log(`Connected to ${address}:${port}`);
});

client.on("message", (channel, tags, message, self) => {
  if (self) return;

  if (message.startsWith("!")) {
    const [command, ...args] = message.split(" ");

    if (commands[command]) {
      if (typeof commands[command] === "function") {
        return commands[command](tags["user-id"], args).then((message) => {
          client.say(channel, message);
        });
      }

      return client.say(channel, commands[message]);
    }

    console.log(`Unknown command ${message}`);
  }

  if (tags.username === "nightbot") {
    client.say(channel, nightbot[Math.floor(Math.random() * nightbot.length)]);
  }

  console.log(`@${tags.username}: ${message}`);
});
