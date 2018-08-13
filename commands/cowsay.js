const Discord = require("discord.js");

exports.run = (client, message, args) => {
    const cowsay = require("cowsay");
    if (args[0]) {
      message.channel.send(('```' + cowsay.say({text : args.join(' ')})) + '```').catch(console.error);
    } else {
      message.channel.send(':interrobang: **What do you want the cow to say? c!cowsay [something]**').catch(console.error);
    }
}