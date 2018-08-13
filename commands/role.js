const Discord = require("discord.js");
exports.run = (client, message, args) => {
    let selfroles = [];
    message.guild.roles.forEach(function(role){
      if (role.name.startsWith('+')) {
        selfroles.push(role);
      }
    });
  
    if (args[0]) {} else {
       args[0] = 'list'; 
    }
  
    if (args[0] == 'get') {
      
      if (args[1].startsWith('+')) {} else{
          args[1] = '+' + args[1];
        }
      
        selfroles.forEach(function(role){
          if (role.name == args[1]) {
            message.member.addRole(role);
            message.channel.send(':gift: **You now have the selfrole ' + args[1] + '.**').catch(console.error);
          }
        });
      
    } else if (args[0] == 'remove') {
      
      if (args[1] == 'all') {
        message.member.roles.forEach(function(role){
          if (role.name.startsWith('+')) {
            message.member.removeRole(role);
          }
        });
        
        message.channel.send(':fire: **Your selfroles have been removed.**').catch(console.error);
      } else {
        if (args[1].startsWith('+')) {} else{
          args[1] = '+' + args[1];
        }
        message.member.roles.forEach(function(role){
          if (role.name == args[1]) {
            message.member.removeRole(role);
            message.channel.send(':fire: **Your selfrole ' + args[1] + ' has been removed.**').catch(console.error);
          }
        });
      }
                 
    } else if (args[0] == 'list') {
      let color = 4886754;
      let embed = new Discord.RichEmbed()
      .setTitle("Selfroles")
      .setAuthor(message.author.username)
      .setColor(color)
      .setFooter('Selfrole names start with the + symbol. To get or remove a selfrole, type ' + process.env.prefix + 'role get/remove (role).')
      selfroles.forEach(function(role){
        let status = ':white_large_square:';
        message.member.roles.forEach(function(snowflake, urole){
          if (snowflake.id == role.id) {
            status = ':white_check_mark:';
          }
        });
        embed.addField(role.name, status, true);
      });
      message.channel.send(embed).catch(console.error);
    }
}