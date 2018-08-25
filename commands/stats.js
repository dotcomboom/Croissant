const Discord = require("discord.js");
exports.run = (client, message, args) => {
    // https://stackoverflow.com/a/49921759
    let totalSeconds = (client.uptime / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    seconds = Math.round(seconds)
    let uptime = '0 seconds';
    if (hours > 0) {
      uptime = `${hours} hours, ${minutes} minutes and ${seconds} seconds`;
    } else if (minutes > 0) {
      uptime = `${minutes} minutes and ${seconds} seconds`;
    } else {
      uptime = `${seconds} seconds`;
    }
  
    let color = message.guild.me.displayColor;
    let embed = new Discord.RichEmbed()
    .setTitle(client.user.username + " Stats")
    .setColor(color)
    .addField(':satellite_orbital: Servers', client.guilds.size, true)
    .addField(':satellite: Channels', client.channels.size, true)
    .addField(':telescope: Users', client.users.size, true)
    .addField(':clock10: Uptime', uptime, true)
    message.channel.send(embed).catch(console.error);
}