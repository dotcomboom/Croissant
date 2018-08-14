const Discord = require("discord.js");

exports.run = (client, message, args) => {
    const cowsay = require("cowsay");
    if (args[0]) {
      message.channel.send(('```' + cowsay.say({text : args.join(' ')})) + '```').catch(console.error);
    } else {
      let color = '#C1192A';
      let embed = new Discord.RichEmbed()
      .setColor(color)
      .setTitle("Hm?")
      .setDescription("What do you want the cow to say? " + process.env.prefix + "cowsay (something)")
      message.channel.send(embed).catch(console.error);
    }
}