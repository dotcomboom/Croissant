const Discord = require("discord.js");
exports.run = (client, message, args) => {
    let color = '#31C119';
    let embed = new Discord.RichEmbed()
    .setTitle(client.user.username + " Stats")
    .setColor(color)
    .addField(':satellite_orbital: Servers', client.guilds.size, true)
    .addField(':satellite: Channels', client.channels.size, true)
    .addField(':telescope: Users', client.users.size, true)
    message.channel.send(embed).catch(console.error);
}