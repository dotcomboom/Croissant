const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");

const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.send(`
<!DOCTYPE html>
<html>
<head>
    <meta property="og:type" content="website" />
    <meta name="og:site_name" content="croissant-bot.glitch.me" />
    <meta name="og:title" content="Croissant" />
    <meta name="og:description" content="Discord bot">
    <meta name="theme-color" content="#333333" />
    <style>
    body {
       background-color: gray;
       font-family: sans-serif;
       color: black;
    }
    a {
      color: white;
    }
    </style>
    <title>Croissant - The Discord Bot</title>
</head>

<body>
<h1 id="croissant">Croissant</h1>
<p>Croissant is a multifunctional Discord bot based on boopie.</p>
<h2 id="commands">Commands</h2>
<p>Items marked with a [B] are original or modified Boopie commands.</p>
<p><strong>🤘 Meta</strong></p>
<ul>
<li>[B] help - Helps you</li>
<li>stats - Bot stats</li>
</ul>
<p><strong>ℹ️ Information</strong></p>
<ul>
<li>user - User information, replaces [B] avatar</li>
<li>guild - Guild information</li>
<li>verbosity - See who has been participating in the channel lately</li>
</ul>
<p><strong>🎉 Fun</strong></p>
<ul>
<li>[B] 8ball - Answers yes/no questions</li>
<li>cowsay - A cow says whatever you want it to</li>
<li>figlet - Make ascii art using figlet fonts</li>
</ul>
<p><strong>🗺️ External</strong></p>
<ul>
<li>neo - Get stats for neocities users</li>
<li>yt - Search youtube</li>
</ul>
<p><strong>📛 Selfroles</strong></p>
<ul>
<li>role - Selfroles (any role in the guild that starts with + is a selfrole and can be obtained by any user)</li>
</ul>
<p><strong>🛠️ Management</strong></p>
<ul>
<li>purge - Delete up to 100 messages in one fell swoop, requires the Manage Messages permission</li>
<li>emote - Add custom emoji with either an upload, URL, or one from DiscordEmoji.com, requires the Manage Emoji permission</li>
</ul>
<h2 id="adding-to-your-server">Adding to your server</h2>
<p><a href="https://discordapp.com/oauth2/authorize?client_id=441444584988606464&amp;scope=bot&amp;permissions=1342565456">👉 👉 👉 here</a></p>
<h2 id="if-the-bot-falls-asleep">If the bot falls asleep</h2>
<p>While I&#39;m trying to keep it up as much as possible, the trick used doesn&#39;t seem to be working all the time. In the event, go to <a href="https://croissant-bot.glitch.me">https://croissant-bot.glitch.me</a>. If you&#39;re using your remix replace croissant-bot with your project name.</p>
<h2 id="-env-variables">.env variables</h2>
<p>TOKEN: Your Discord app token</p>
<p>prefix: Your desired prefix. I use &#39;c!&#39;</p>
<p>ownerID: Your username. Currently unused.</p>
<p>game: What the bot is &quot;playing&quot;. I use &#39;c!help&#39; so people know the prefix right away.</p>
<p>projectname: The project name on Glitch. This helps the bot poke itself every little while to attempt staying awake.</p>
<p>ytkey: API key for the <a href="https://console.developers.google.com/apis/library/youtube.googleapis.com/?q=youtube">YouTube Data API v3</a>. (required for the yt command)</p>
</body>
</html>
`);
  //response.sendStatus(200);
});
app.listen(process.env.PORT);
// console.log('http://' + process.env.projectname +  '.glitch.me/')
setInterval(() => {
  http.get('http://' + process.env.projectname +  '.glitch.me/');
}, 140000);
// was 280000

const prefix = process.env.prefix; //Set our prefix

// This loop reads the /events/ folder and attaches each event file to the appropriate event.
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    // super-secret recipe to call events with all their proper arguments *after* the `client` var.
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});

client.on("message", message => {
  if (message.author.bot) return;
  if(message.content.indexOf(prefix) !== 0) return;

  // This is the best way to define args. Trust me.
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // The list of if/else is replaced with those simple 2 lines:
  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, message, args);
    console.log("Message detected.")
  } catch (err) {
    console.error(err);
  }
});

client.login(process.env.TOKEN);