const Discord = require("discord.js");
exports.run = (client, message, args) => {
    // https://bytenota.com/javascript-replace-last-occurrence-of-a-string/
    function replaceLast(find, replace, string) {
      var lastIndex = string.lastIndexOf(find);
      
      if (lastIndex === -1) {
          return string;
      }
      
      var beginString = string.substring(0, lastIndex);
      var endString = string.substring(lastIndex + find.length);
      
      return beginString + replace + endString;
    }
  
    // https://stackoverflow.com/a/49921759
    let totalSeconds = (client.uptime / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    seconds = Math.round(seconds)
  
    let uptimelist = [];
  
    if (hours > 0) {
       if (hours > 1) {
         uptimelist.push(hours + ' hours')
       } else {
         uptimelist.push(hours + ' hour')
       }
    }
  
    if (minutes > 0) {
       if (minutes > 1) {
         uptimelist.push(minutes + ' minutes')
       } else {
         uptimelist.push(minutes + ' minute')
       }
    }
  
    if (seconds > 0) {
       if (seconds > 1) {
         uptimelist.push(seconds + ' seconds')
       } else {
         uptimelist.push(seconds + ' second')
       }
    }
  
    let uptime = replaceLast(', ', ', and ', uptimelist.join(', '))
  
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