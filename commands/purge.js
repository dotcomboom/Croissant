const Discord = require("discord.js");

exports.run = (client, message, args) => {
    if (message.member.hasPermission(8192)) {
      if (args[0]) {
        
      let todelete = args[0];
      if (todelete > 100) {
         todelete = 100;  // discord complains if it's over 100
      }
    message.channel.fetchMessages({ limit: todelete })
    .then(messages => {
      
      let deleted = 0;
      
      messages.forEach(function(msg){
        if (message.mentions.members.size == 0) {
          if (args[1] == 'bots') {
            if (msg.author.bot) {
              msg.delete();
              deleted += 1; 
            }
          } else {
            msg.delete();
            deleted += 1;
          }
        } else {
          if (msg.author.id == message.mentions.members.first().id) {
            msg.delete();
            deleted += 1;
          }
        }
      });
      async function ok() {
        let color = '#31C119';
        let embed = new Discord.RichEmbed()
        .setTitle(':fire: Purging ' + deleted + ' messages.')
        .setColor(color)
        let msg = await message.channel.send(embed).catch(console.error);
        msg.delete(3000);
      }
      ok();
      
    })
    .catch(console.error);
      
      } else {
        let color = '#C1192A';
        let embed = new Discord.RichEmbed()
        .setColor(color)
        .setTitle("Hm?")
        .setDescription("How many messages do you want to purge? And if desired, of whose messages do you want to purge? " + process.env.prefix + "purge (1-100) [(@user)/bots]")
        message.channel.send(embed).catch(console.error);
      }
    } else {
      let color = '#C1192A';
      let embed = new Discord.RichEmbed()
      .setColor(color)
      .setTitle("Insufficient permissions!")
      .setDescription("You need the **Manage Messages** permission to purge messages.")
      message.channel.send(embed).catch(console.error);
    }
}