const Discord = require("discord.js");
const neo = require('neocities');
const htmlencode = require('htmlencode');
var neoapi = new neo();

function scrape (username, cache) {
  return new Promise(async (resolve, reject) => {
    const request = require('request')
    const cheerio = require('cheerio')
    
    var arr = []
    
    var usr = username.toLowerCase();
    
    request('https://neocities.org/site/' + usr, (err, res, body) => {
      if (err)
      {
        return reject(err)
      }
      
      var $ = cheerio.load(body);
      
       $('.stat strong').each(function( index ) {
        arr.push($(this).text().trim());
      });
      
      var feed = [];
      $(":not(.comments) > .news-item.comment").each(function( index ) {
        if ($(this).html().indexOf('<i class="fa fa-chevron-right comment-symbol" title="commented on"></i>') > -1) {
          
        } else {
         feed.push($(this).find('.content').text().trim().split('\n')[0]); 
        }
      });
      
      arr.push(feed);
      
      arr.push('https://neocities.org' + $('.screenshot').css("background-image").replace('url(','').replace(')',''));
      
      resolve(arr) 
    })
  })
}

function updated (username) {
  return new Promise(async (resolve, reject) => {
    var arr = [];
    var usr = username.toLowerCase();
  neoapi.info(usr, function(resp) {
    let idate = resp.info.last_updated;
    idate = idate.split(" ");
    let date = idate[2] + " " + parseInt(idate[1]) + ', ' + idate[3];
      
      resolve(date) 
    })
  })};


exports.run = (client, message, args) => {
  if (args[0]) {
    
  let username = args[0];
  scrape(username).then((stats) => {
    let views = stats[0];
    let followers = stats[1];
    let updates = stats[2];
    let tips = stats[3];
    updated(username).then((updated) => {
      let created = stats[5];
      let quote = stats[6][0];
      if (quote) {
         quote = `*"${quote}"*`;
      } else {
         quote = ''
      }
      let thumbnail = stats[7];
    
      let color = message.guild.me.displayColor;
      let embed = new Discord.RichEmbed()
          .setTitle("Neocities Stats")
          .setAuthor(username)
          .setURL(`https://neocities.org/site/${username}`)
          .setThumbnail(thumbnail)
          .setColor(color)
          .setDescription(quote)
          .addField(':eyes: Views', views, true)
          .addField(':bird: Followers', followers, true)
          .addField(':hammer: Updates', updates, true)
          .addField(':money_with_wings: Tips', tips, true)
          .addField(':runner: Updated', updated, true)
          .addField(':birthday: Created', created, true)
      
      message.channel.send(embed).catch(console.error);
    });
  });
  } else {
    let color = '#C1192A';
    let embed = new Discord.RichEmbed()
    .setColor(color)
    .setTitle("Hm?")
    .setDescription("What Neocities site do you want to look up? " + process.env.prefix + "neo (site)")
    message.channel.send(embed).catch(console.error);
  }
}