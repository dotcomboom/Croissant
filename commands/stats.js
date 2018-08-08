const Discord = require("discord.js");
exports.run = (client, message, args) => {
    let color = 4886754;
    let embed = new Discord.RichEmbed()
    .setTitle("Bot Stats")
    .setColor(color)
    .addField(':satellite_orbital: Servers', client.guilds.size, true)
    .addField(':satellite: Channels', client.channels.size, true)
    .addField(':telescope: Users', client.users.size, true)
    message.channel.send(embed).catch(console.error);
}