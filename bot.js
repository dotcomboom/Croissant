const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");

const http = require('http');
const express = require('express');
const app = express();
app.use(express.static('public'));

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