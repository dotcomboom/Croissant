const Discord = require("discord.js");
const dateformat = require("dateformat");

exports.run = (client, message, args) => {
    let g = message.guild;
    let roles = []
    let roleNames = [];
    g.roles.forEach(function(role){
      roles.push(role);
      if (role.name != '@everyone') {
        if (role.name.startsWith('+')) {
          roleNames.push('*' + role.name + '*');
        } else {
          roleNames.push(role.name);
        }
      }
    });

    let color = '#31C119';
    let embed = new Discord.RichEmbed()
    .setTitle("Guild Information")
    .setColor(color)
    .setAuthor(g.name)
    .setThumbnail(g.iconURL)
    .addField(':paperclip: ID', g.id, true)
    .addField(':name_badge: Owner', g.owner.user.tag, true)
    .addField(':birthday: Created', dateformat(g.createdAt, "dddd, mmmm dS, yyyy, h:MM:ss TT"), true)
    .addField(':crossed_swords: Added ' + client.user.username, dateformat(g.joinedAt, "dddd, mmmm dS, yyyy, h:MM:ss TT"), true)
    .addField(':map: Region', g.region, true)
    .addField(':dolphin: Members', g.memberCount, true)
    .addField(':crown: Roles', roleNames.join(', '), true)
    if (g.features.length > 0) {
      embed.addField(':star: Features', g.features.join(', '), true)
    }
    
    message.channel.send(embed).catch(console.error);
}