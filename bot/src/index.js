const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

/* In search of the perfect URL validation regex https://mathiasbynens.be/demo/url-regex */
const extractUrls = (text) =>
  text.match(
    /(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?/gi
  ) || [];

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
        return "You already have an assistance request, let's finish it before adding another one";
      }

      const links = extractUrls(args);

      /*
        TODO: should only accept links from approved
        hosts (github, pastebin, fiddle)
      */
      return axios
        .post("/requests", {
          twitchid: id,
          link: links.length > 0 ? links[0] : null,
          description: args,
          type,
        })
        .then((response) => {
          return "You are now in the assistance request queue";
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

    if (args.length === 0)
      return client.say(channel, "Must include a description for the request");

    if (commands[command]) {
      if (typeof commands[command] === "function") {
        return commands[command](tags["user-id"], args.join(" ")).then(
          (message) => {
            client.say(channel, message);
          }
        );
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
