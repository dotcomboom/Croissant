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
  
  let color = '#31C119';
  let embed = new Discord.RichEmbed()
  .setTitle(client.user.username + " Commands")
  .setColor(color)
  .addField(':metal: Meta', prefix + 'help, ' + 
                            prefix + 'stats', true)
  .addField(':information_source: Information', prefix + 'user, ' + 
                                                prefix + 'guild, ' + 
                                                prefix + 'verbosity', true)
  .addField(':tada: Fun', prefix + '8ball, ' + 
                          prefix + 'figlet, ' + 
                          prefix + 'cowsay', true)
  .addField(':map: External', prefix + 'neo, ' + 
                              prefix + 'yt', true)
  .addField(':name_badge: Selfroles', prefix + 'role', true)
  .addField(':tools: Management', prefix + 'purge, ' + 
                                   prefix + 'emote', true)
  
  message.channel.send(embed).catch(console.error);
}