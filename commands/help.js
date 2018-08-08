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
  .setTitle("Commands")
  .setColor(color)
  .addField(prefix + 'help', 'How do I work this thing?!?', true)
  .addField(prefix + 'ping', 'Pong?', true)
  .addField(prefix + 'stats', 'Bot statistics.', true)
  .addField(prefix + 'avatar [@user]', 'Get the avatar of a user.', true)
  .addField(prefix + '8ball [question]', 'Ask a question to math.random!', true)
  .addField(prefix + 'neo [sitename]', 'Get Neocities site stats.', true)
  .addField(prefix + 'figlet [font] [text]', 'Generate ASCII art text with Figlet. Use ' + prefix + 'figlet fonts for a list.', true)
  .addField(prefix + 'yt [query]', 'Search for YouTube videos.', true)
  .addField(prefix + 'face', 'Cool ASCII faces.', true)
  
  message.channel.send(embed).catch(console.error);
}
