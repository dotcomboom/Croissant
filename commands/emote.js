const Discord = require("discord.js");
const request = require("request");

exports.run = (client, message, args) => {
      let searched = false;
      if (args[0] == 'search') {
           searched = true;
           request('https://discordemoji.com/api', function (error, response, body) {
              if (error) {
                 message.channel.send(':interrobang: **Failed to contact DiscordEmoji API!**');
              } else {
                let api = JSON.parse(body);
                let results = [];
                api.forEach(function(item) {
                  if ((item.slug.includes(args[1])) && (item.image.includes('png'))) { // item.image.includes('png') makes sure it's not an animated gif, but a PNG emoji
                    results.push(item.slug);
                  }
                });
                if (results.length > 0) {
                  message.channel.send(':printer: **Your DiscordEmoji.com results:** ```' + results.join(', ') + '```*Add emojis with `c!emote [name]`.\nRemember, emoji names are cAsE sEnSiTiVe!*');
                } else {
                  message.channel.send(':interrobang: **Nothing turned up..**')
                }
              }
            });
      } 
    if (message.member.hasPermission(1073741824)) {
        if (!searched) {
      let url = '';
      let name = '';
      if (args[0]) {
      if (args[0].startsWith('http')) {
            url = args[0];
            if (args[1]) { name = args[1]; } else {
              name = args[0].substring(url.lastIndexOf('/')+1).split('.')[0].replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
            }
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
              if (args[0] == 'search') {} else {
                message.channel.send(":interrobang: **What emoji do you want me to add? Do " + process.env.prefix + "emote and an attachment, URL, or the name of one from discordemoji.com. You can also do " + process.env.prefix + "emote search (query) to see what's there.**").catch(console.error);  
              }
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
  .then(emoji => {if (emoji.id) {message.channel.send(':white_check_mark: ** :' + name + ': created.** ' + url)}})
  .catch(emoji => {if (emoji.id) {} else {message.channel.send(':interrobang: **Failed to create :' + name + ':! The image might be larger than 256 kb.**');}});
            } else {
              message.channel.send(`:interrobang:  **Recieved error code ${response.statusCode}.**`).catch(console.error); 
            }
          })
      }
        }
    } else {
      message.channel.send(':no_entry: **403: You need the Manage Emoji permission to do this!**').catch(console.error);
    }
}