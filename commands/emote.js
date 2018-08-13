const Discord = require("discord.js");
const request = require("request");

exports.run = (client, message, args) => {
    if (message.member.hasPermission(1073741824)) {
      let url = '';
      let name = '';
      if (args[0]) {
      if (args[0].startsWith('http')) {
            url = args[0];
            if (args[1]) { name = args[1]; } else {
              name = args[0].substring(url.lastIndexOf('/')+1).split('.')[0].replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
            }
      } else if (args[0] == 'search') {
           request('https://discordemoji.com/api', function (error, response, body) {
              if (error) {
                 message.channel.send(':interrobang: **Failed to contact DiscordEmoji API!**');
              } else {
                let api = JSON.parse(body);
                let results = [];
                api.forEach(function(item) {
                  if (item.slug.includes(args[1])) {
                    results.push(item.slug);
                  }
                });
                if (results.length > 0) {
                  message.channel.send('Your results: ```' + results.join(', ') + '```*Add emojis with `c!emote [name]`.\nRemember, emoji names are cAsE sEnSiTiVe!*');
                } else {
                  message.channel.send(':interrobang: **Nothing turned up..**')
                }
              }
            });
      } else {
            url = 'https://discordemoji.com/assets/emoji/' + args[0] + '.png';
            if (args[1]) { name = args[1]; } else {
              name = url.substring(url.lastIndexOf('/')+1).split('.')[0].replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
            }
      }
      }
            if (message.attachments.first()) {
                url = message.attachments.first().url;
                if (args[0]) { name = args[0]; } else {
                  name = url.substring(url.lastIndexOf('/')+1).split('.')[0].replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
                }
            }
      
            if (url == '') {
              message.channel.send(':interrobang: **400: What emote do you want me to add? A URL, upload, or the name of one from discordemoji.com. Or you can `c!emote search ______`. That works too.**').catch(console.error);  
            }
      
      if (url == '') {} else {
        if (name.length > 32) {
          name = name.substring(1, 32);
        } else if (name.length < 2) {
          name = name + name;
        }
      request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
              message.guild.createEmoji(url, name)
  .then(emoji => {if (emoji) {message.channel.send(':white_check_mark: ** :' + name + ': created.** ' + url)}})
  .catch(emoji => {if (emoji.id) {} else {message.channel.send(':interrobang: **Failed to create :' + name + ':! The image might be larger than 256 kb.**');}});
            } else {
              message.channel.send(`:interrobang:  **Recieved error code ${response.statusCode}.**`).catch(console.error); 
            }
          })
      }
    } else {
      message.channel.send(':no_entry: **403: You need the Manage Emoji permission to do this!**').catch(console.error);
    }
}