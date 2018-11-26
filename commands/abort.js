const Discord = require("discord.js");

exports.run = (client, message, args) => {
    if (message.author.id == process.env.ownerID) {
      message.channel.send('AHOY!')
      process.exit(1);
    }
}