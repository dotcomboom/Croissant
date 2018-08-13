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
      message.channel.send(':interrobang: **What video do you want to search for? c!yt (query)**').catch(console.error);
    }
}