const Discord = require("discord.js");
const translate = require("yandex-translate")(process.env.tkey);

exports.run = (client, message, args) => {
  if (args.length > 0) {
    let engrish = args.join(' ');
    translate.translate(engrish, { to: 'ru' }, function (err, res) {
      console.log(engrish);
      engrish = res.text[0];
      translate.translate(engrish, { to: 'es' }, function (err, res) {
        console.log(engrish);
        engrish = res.text[0];
        translate.translate(engrish, { to: 'en' }, function (err, res) {
          console.log(engrish);
          engrish = res.text[0];
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
        });
      });
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