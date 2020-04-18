# Assistbot

Assistbot will listen to the chat within a Twitch channel and respond to assistance requests. The assistance requests are queued for the streamer to accept and complete.

## Prerequisites

- Docker
- Twitch Account for Bot

## Set up Twitch Bot

Create a new account for the twitch bot if you don't have one already.

The bot will need access to the Twitch IRC server and the Twitch API. The Twitch API is used to download user avatars etc...

With your Twitch Bot account, create an OAuth password using the [Twitch Chat OAuth Password Generator](https://twitchapps.com/tmi/) Token.

The environment variables for the bot are kept in a `bot/.env` file. Use the `bot/.env.example` file as a template.

The username is the Twitch Bot username. The token is the value generated with the OAuth Password Generator, and the channel is provided so the bot knows which Twitch channel to join (currently supports one).

```
TWITCH_OAUTH_USERNAME=
TWITCH_OAUTH_TOKEN=
TWITCH_CHANNEL=
```

The API server makes requests to the Twitch API. A client ID is required and can be created using the [Twitch Developer Dashboard](https://dev.twitch.tv/).

The environment variables for the bot are kept in a `server/.env` file. Use the `server/.env.example` file as a template.

```
TWITCH_BASEURL=https://api.twitch.tv/helix
TWITCH_CLIENTID=
```

## Set up Build With Docker

Once the environment is configured we can build the images and run the containers.

There are two node servers and a client application. The main express server handles the API requests and serves the static client files. The bot runs in as a separate node process. PM2 is used to manage the running processes.

```
docker-compose up
```

When complete nginx and postgres containers will be started. Connect to the server using `http://localhost:8080` in the browser.
