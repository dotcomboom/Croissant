const Discord = require("discord.js");
const translate = require("google-translate-api");

exports.run = (client, message, args) => {
  
    if (args.length > 0) {
    let engrish = args.join(' ');
    
    translate(engrish, {to: 'japanese'}).then(res => {
      engrish = res.text;
      translate(engrish, {to: 'esperanto'}).then(res => {
        engrish = res.text;
        translate(engrish, {to: 'arabic'}).then(res => {
          engrish = res.text;
          translate(engrish, {to: 'english'}).then(res => {
            engrish = res.text;
            
            let color = "#ffa500"
            if (message.guild !== null) {
              color = message.guild.me.displayColor;
            }
            let embed = new Discord.RichEmbed()
            .setAuthor(message.author.username)
            .setTitle("Engrish")
            .setColor(color)
            .setDescription(engrish)
            message.channel.send(embed).catch(console.error);
            
          }).catch(err => {
              console.error(err);
          });
        }).catch(err => {
            console.error(err);
        });
      }).catch(err => {
        console.error(err);
      });
    }).catch(err => {
      console.error(err);
    });
    } else {
      let color = '#C1192A';
      let embed = new Discord.RichEmbed()
      .setColor(color)
      .setTitle("Hm?")
      .setDescription("What do you want to make Engrish? " + process.env.prefix + "engrish (something)")
      message.channel.send(embed).catch(console.error);
    }
}