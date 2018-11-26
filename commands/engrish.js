const Discord = require("discord.js");
const translate = require("translate");

exports.run = (client, message, args) => {
  translate.engine = 'yandex';
  translate.key = process.env.tkey;
translate('Hello world', 'es').then(text => {
  console.log(text);  // Hola mundo
});

    if (args.length > 0) {
    let engrish = args.join(' ');
    translate(engrish, 'japanese').then(text => {
      engrish = text;
      translate(engrish, 'chinese').then(text => {
        engrish = text;
        translate(engrish, 'arabic').then(text => {
          engrish = text;
          translate(engrish, 'english').then(text => {
            engrish = text;
            
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