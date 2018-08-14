const Discord = require("discord.js");

exports.run = (client, message, args) => {
    if (args[0]) {
    var search = require('youtube-search');
 
    var opts = {
      maxResults: 1,
      key: process.env.ytkey,
      type: 'video'
    };
    let nm = args.join(' ');
    search(nm, opts, function(err, results) {
      if(err) return console.log(err);
      message.channel.send(':movie_camera: ***' + results[0].title + '*** - *' + results[0].channelTitle + '*\n' + results[0].link).catch(console.error);
    });
    } else {
      let color = '#C1192A';
      let embed = new Discord.RichEmbed()
      .setColor(color)
      .setTitle("Hm?")
      .setDescription("What video do you want to search for? " + process.env.prefix + "yt (query)")
      message.channel.send(embed).catch(console.error);
    }
}