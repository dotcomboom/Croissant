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
                  if ((item.slug.includes(args[1])) && (item.image.includes('png')) && !(item.slug.includes(':')) && !(item.slug == 'search')) { // item.image.includes('png') makes sure it's not an animated gif, but a PNG emoji, also make sure it doesn't include : because that'd mess it all up for some reason
                    results.push(item.slug);
                  }
                });
                if (results.length > 0) {
                  if (results.join(', ').length > 2048) {
                    let color = '#C1192A';
                    let embed = new Discord.RichEmbed()
                    .setColor(color)
                    .setTitle("Too many results!")
                    .setDescription("You can try making your query a little more specific.")
                    message.channel.send(embed).catch(console.error);
                  } else {
                    let color = message.guild.me.displayColor;
                    let embed = new Discord.RichEmbed()
                    .setColor(color)
                    .setTitle("DiscordEmoji.com Results")
                    .setDescription('`' + results.join(', ') + '`')
                    .setFooter('Add emojis with c!emote [name]. Remember, emoji names are cAsE sEnSiTiVe!')
                    message.channel.send(embed).catch(console.error);
                  }
                } else {
                  if (args[1]) {
                    let color = '#C1192A';
                    let embed = new Discord.RichEmbed()
                    .setColor(color)
                    .setTitle("Nothing turned up...")
                    .setDescription("You can try generalizing your query a bit.")
                    message.channel.send(embed).catch(console.error);
                  } else {
                    let color = '#C1192A';
                    let embed = new Discord.RichEmbed()
                    .setColor(color)
                    .setTitle("Hm?")
                    .setDescription("What do you want to search for? c!emote search (query)")
                    message.channel.send(embed).catch(console.error);
                  }
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
                let color = '#C1192A';
                let embed = new Discord.RichEmbed()
                .setColor(color)
                .setTitle("Hm?")
                .setDescription("What emoji do you want me to add? Do " + process.env.prefix + "emote and an attachment, URL, or the name of one from discordemoji.com. You can also do " + process.env.prefix + "emote search (query) to see what's there.")
                message.channel.send(embed).catch(console.error);  
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
  .then(emoji => {if (emoji.id) {
    
                  let color = message.guild.me.displayColor;
                  let embed = new Discord.RichEmbed()
                  .setColor(color)
                  .setThumbnail(url)
                  .setTitle(":" + name + ": created.")
                  message.channel.send(embed).catch(console.error);
  
               }})
  .catch(emoji => {if (emoji.id) {} else {
    
                if (message.guild.me.hasPermission(1073741824)) {
                  let color = '#C1192A';
                  let embed = new Discord.RichEmbed()
                  .setColor(color)
                  .setThumbnail(url)
                  .setTitle("Failed to create :" + name + ':!')
                  .setDescription("The image might be larger than 256 kb.")
                  message.channel.send(embed);
                } else {
                  let color = '#C1192A';
                  let embed = new Discord.RichEmbed()
                  .setColor(color)
                  .setTitle("Insufficient permissions!")
                  .setDescription(client.user.username + " needs the **Manage Emoji** permission to add emojis.")
                  message.channel.send(embed);
                }
            
              }});
            } else {
                let color = '#C1192A';
                let embed = new Discord.RichEmbed()
                .setColor(color)
                .setThumbnail(url)
                .setTitle("Failed to create :" + name + ':!')
                if (response) {
                  embed.setDescription("Recieved error code " + response.statusCode + ".")
                }
                message.channel.send(embed);
            }
          })
      }
        }
    } else {
      let color = '#C1192A';
      let embed = new Discord.RichEmbed()
      .setColor(color)
      .setTitle("Insufficient permissions!")
      .setDescription("You need the **Manage Emoji** permission to add emojis.")
      message.channel.send(embed);
      }
    }