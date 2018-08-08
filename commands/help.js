exports.run = (client, message, args) => {
  const fs = require('fs');

  let list = '';
  
fs.readdir('./', (err, files) => {
  files.forEach(file => {
    list = list + file + '/n'
  });
})
  
  let prefix = process.env.prefix
  
    const embed = {
  "color": 4886754,
  "author": {
    "name": "Commands"
  },
  "fields": [
    {
      "name": prefix + "help",
      "value": "How do I work this thing?!?"
    },
    {
      "name": prefix + "ping",
      "value": "Pong?"
    },
    {
      "name": prefix + "status",
      "value": "Check the status of the bot."
    },
    {
      "name": prefix + "avatar [@user]",
      "value": "Get the link of the avatar a user (or you if you don't mention anyone)."
    },
    {
      "name": prefix + "8ball <question>",
      "value": "Ask the 8 Ball! Or actually, a random number generator."
    },
    {
      "name": prefix + "say",
      "value": "I repeat what you say."
    },
    {
      "name": prefix + "neo [sitename]",
      "value": "Get Neocities site stats."
    },
    {
      "name": prefix + "figlet [font] [text]",
      "value": "Make text into ASCII art using Figlet! See all installed fonts with " + prefix + "figlet fonts"
    },
    {
      "name": prefix + "yt [query]",
      "value": "Search for a video on YouTube."
    },
    {
      "name": prefix + "face",
      "value": "Cool ASCII faces."
    }
  ]
};
message.channel.send({ embed }).catch(console.error);
}
