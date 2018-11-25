const Discord = require("discord.js");
exports.run = (client, message, args) => {
    let color = "#ffa500"
    if (message.guild !== null) {
      color = message.guild.me.displayColor;
    }
    let embed = new Discord.RichEmbed()
    .setColor(color);
    if (args[0] == 'bots') {
      embed.setTitle(":loudspeaker: Bot Verbosity in #" + message.channel.name)
    } else {
      embed.setTitle(":loudspeaker: Verbosity in #" + message.channel.name)
    }
    message.channel.fetchMessages({ })
    .then(messages => {
      
      let msgsbyuser = 0;
      let people = [];
      let unique = [];
      messages.forEach(function(message){
        if (args[0] == 'bots') {
          if (!message.author.bot) {} else {
            people.push(message.member.displayName);
            if (unique.includes(message.member.displayName)) {} else {
                unique.push(message.member.displayName);
            }
          }
        } else {
          if (message.author.bot) {} else {
            if (message.content.startsWith(process.env.prefix)) {} else {
              people.push(message.member.displayName);
              if (unique.includes(message.member.displayName)) {} else {
                  unique.push(message.member.displayName);
              }
            }
          }
        }
      });
      unique.forEach(function(displayName){
         
         let count = 0;
         people.forEach(function(dName){
           if (dName == displayName) {
            count += 1; 
           }
         });
        embed.addField(displayName, count + '/' + people.length + ' (' + (Math.round((count / people.length) * 100)) + '%)', true);
                          
      });
      if (people.length < 1) {
        embed.setDescription('No data'); 
      } else {
        if (people.length == 1) {
          embed.setDescription('The last ' + people.length + ' message'); 
        } else {
          embed.setDescription('The last ' + people.length + ' messages');  
        }
      }
      if (args[0] == 'bots') {} else {
        embed.setFooter('For bot verbosity, use ' + process.env.prefix + 'verbosity bots.');
      }
      message.channel.send(embed).catch(console.error);
    }).catch(console.error)
}