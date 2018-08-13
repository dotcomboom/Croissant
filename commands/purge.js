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
        let msg = await message.channel.send(':fire: **Purging ' + deleted + ' messages.**').catch(console.error);
        msg.delete(3000);
      }
      ok();
      
    })
    .catch(console.error);
      
      } else {
        message.channel.send(":interrobang: **How many messages do you want to purge? If desired, also who's messages do you want to purge? " + process.env.prefix + "purge (1-100) [(@user)/bots]**").catch(console.error);
      }
    } else {
      message.channel.send(':no_entry: **403: You need the Manage Messages permission to do this!**').catch(console.error);
    }
}