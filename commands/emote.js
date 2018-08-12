const Discord = require("discord.js");
const request = require("request");

exports.run = (client, message, args) => {
    if (message.member.hasPermission(1073741824)) {
      let url = '';
      let name = '';
      if (args[0] == 'url') {
          if (args[1]) {
            url = args[1];
            if (args[2]) { name = args[2]; } else {
              name = args[1].substring(url.lastIndexOf('/')+1).split('.')[0];
            }
          } else {
            message.channel.send(':interrobang:  **400: Which URL?**').catch(console.error); 
          }
      } else if (args[0] == 'de') {
          if (args[1]) {
            url = 'https://discordemoji.com/assets/emoji/' + args[1] + '.png';
            name = args[1];
          } else {
            message.channel.send(':interrobang: **400: What emote do you want me to look for?**').catch(console.error); 
          }
      }
      if (url != '') {
      request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
              message.guild.createEmoji(url, name);
              message.channel.send(':white_check_mark: ** :' + name + ': created.** ' + url);
            } else {
              message.channel.send(`:interrobang:  **Recieved error code ${response.statusCode}.**`).catch(console.error); 
            }
          })
      }
    } else {
      message.channel.send(':no_entry: **403: You need the Manage Emoji permission to do this!**').catch(console.error);
    }
}