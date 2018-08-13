const Discord = require("discord.js");

exports.run = (client, message, args) => {
    if (message.member.hasPermission(8192)) {
      if (args[0]) {
        
      let todelete = args[0];
      message.delete();
      if (todelete > 100) {
         todelete = 100;  // discord complains if it's over 100
      }
    message.channel.fetchMessages({ limit: todelete })
    .then(messages => {
      
      let deleted = 0;
      
      messages.forEach(function(message){
        message.delete();
        deleted += 1;
      });
      async function ok() {
        let msg = await message.channel.send(':fire: **Purging ' + deleted + ' messages.**').catch(console.error);
        msg.delete(3000);
      }
      ok();
      
    })
    .catch(console.error);
      
      } else {
        message.channel.send(':interrobang: **How many messages do you want to purge? ' + process.env.prefix + 'purge [1-100]**').catch(console.error);
      }
    } else {
      message.channel.send(':no_entry: **403: You need the Manage Messages permission to do this!**').catch(console.error);
    }
}