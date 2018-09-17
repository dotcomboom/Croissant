const Discord = require("discord.js");
exports.run = (client, message, args) => {
    if (message.author.tag == process.env.ownerID) {
      message.channel.send(args.join(' '));
    }
    message.delete();
}