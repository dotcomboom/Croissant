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
  .addField(prefix + 'user [@user]', 'Get user information.', true)
  .addField(prefix + 'verbosity', 'See who has been participating lately.', true)
  .addField(prefix + '8ball [question]', 'Ask a question to math.random!', true)
  .addField(prefix + 'neo [sitename]', 'Get Neocities site stats.', true)
  .addField(prefix + 'figlet [font] [text]', 'Generate ASCII art text with Figlet. Use ' + prefix + 'figlet fonts for a list.', true)
  .addField(prefix + 'yt [query]', 'Search for YouTube videos.', true)
  .addField(prefix + 'face', 'Cool ASCII faces.', true)
  .addField(prefix + 'role [list/remove (role)/get (role)]', 'Obtain selfroles. (start with **+**)', true)
  .addField(prefix + 'purge [1-100]', 'Delete multiple messages in one fell swoop.', true)
  .addField(prefix + 'emote [url (url)/de (name)]', 'Add custom emoji to the server.', true)
  
  message.channel.send(embed).catch(console.error);
}
