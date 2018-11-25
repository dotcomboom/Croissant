const Discord = require("discord.js");
const dateformat = require("dateformat");

exports.run = (client, message, args) => {
    let u, gm; // u is global, gm is only for this guild
    if (message.mentions.members.size == 0) {
      u = message.author;
      gm = message.member; 
    } else {
      u = message.mentions.users.first();
      gm = message.mentions.members.first();
    }
    let roles = []
    let roleNames = [];
    gm.roles.forEach(function(role){
      roles.push(role);
      if (role.name != '@everyone') {
        if (role.name.startsWith('+')) {
          roleNames.push('*' + role.name + '*');
        } else {
          roleNames.push(role.name);
        }
      }
    });
    let verbosity = 0;
    message.channel.fetchMessages({ })
    .then(messages => {
      
      let msgsbyuser = 0;
      let msgamount = messages.size;
      
      if (u.bot) {
        messages.forEach(function(message){
          if (!message.author.bot) {
            msgamount = msgamount - 1;
          } else {
            if (message.author.tag == u.tag) {
              msgsbyuser += 1;
            }
          }
        });
      } else {
        messages.forEach(function(message){
          if ((message.author.bot) || (message.content.startsWith(process.env.prefix)) || (message.content.length < 2)) {
            msgamount = msgamount - 1;
          } else {
            if (message.author.tag == u.tag) {
              msgsbyuser += 1;
            }
          }
        });
      }
      
      if (msgamount > 0) {
        verbosity = msgsbyuser + '/' + msgamount + ' (' + (Math.round((msgsbyuser / msgamount) * 100)) + '%)';
      } else {
        verbosity = `No data`; 
      }
  
      let color = gm.displayColor;
      let embed = new Discord.RichEmbed()
      .setTitle("User Information")
      .setColor(color)
      .setAuthor(gm.displayName)
      .setThumbnail(u.displayAvatarURL)
      if (u.bot) {
        embed.addField(':robot: Bot', u.bot.toString().toUpperCase(), true);
      }
      embed.addField(':name_badge: Tag', u.tag, true)
      embed.addField(':paperclip: ID', u.id, true)
      embed.addField(':birthday: Joined Discord', dateformat(u.createdAt, "dddd, mmmm dS, yyyy, h:MM:ss TT"), true)
      embed.addField(':crossed_swords: Joined ' + message.guild.name, dateformat(gm.joinedAt, "dddd, mmmm dS, yyyy, h:MM:ss TT"), true);
      if (u.bot) {
        embed.addField(':loudspeaker: Bot Verbosity in #' + message.channel.name, verbosity, true)
      } else {
        embed.addField(':loudspeaker: Verbosity in #' + message.channel.name, verbosity, true)
      }
      if (roleNames.length > 0) {
        embed.addField(':crown: Roles', roleNames.join(', '), true)
      }
      if (message.mentions.members.size == 0) {
       embed.footer = 'To view another user, use ' + process.env.prefix + 'user (@user).' 
      }
      message.channel.send(embed).catch(console.error);
        
    })
    .catch(console.error);
}
