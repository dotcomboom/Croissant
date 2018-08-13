const Discord = require("discord.js");

exports.run = (client, message, args) => {
  const fs = require('fs');

  let list = '';
  
fs.readdir('./', (err, files) => {
  files.forEach(file => {
    list = list + file + '/n'
  });
})
  
  let prefix = process.env.prefix
  
  let color = 4886754;
  let embed = new Discord.RichEmbed()
  .setAuthor(client.user.username)
  .setTitle("Commands")
  .setColor(color)
  .addField(':metal: Meta', process.env.prefix + 'help, ' + 
                            process.env.prefix + 'stats', true)
  .addField(':information_source: Information', process.env.prefix + 'user, ' + 
                                                process.env.prefix + 'guild, ' + 
                                                process.env.prefix + 'verbosity', true)
  .addField(':tada: Fun', process.env.prefix + '8ball, ' + 
                          process.env.prefix + 'figlet', true)
  .addField(':map: External', process.env.prefix + 'neo, ' + 
                              process.env.prefix + 'yt', true)
  .addField(':name_badge: Selfroles', process.env.prefix + 'role', true)
  .addField(':hammer: Management', process.env.prefix + 'purge, ' + 
                                   process.env.prefix + 'emote', true)
  
  message.channel.send(embed).catch(console.error);
}