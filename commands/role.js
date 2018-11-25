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
      
      if (args[1] == 'all') {
        selfroles.forEach(function(role){
          if (role.name.startsWith('+')) {
            message.member.addRole(role);
          }
        });
        let color = "#ffa500"
        if (message.guild !== null) {
          color = message.guild.me.displayColor;
        }
        let embed = new Discord.RichEmbed()
        .setTitle(':gift: You now have all selfroles.')
        .setColor(color)
        message.channel.send(embed).catch(console.error);
      } else {
      
        args[1] = args.join(' ').replace('get ', '');
        
      if (args[1].startsWith('+')) {} else{
          args[1] = '+' + args[1];
        }
      
        selfroles.forEach(function(role){
          if (role.name.toLowerCase() == args[1].toLowerCase()) {
            message.member.addRole(role);
            let color = "#ffa500"
            if (message.guild !== null) {
              color = message.guild.me.displayColor;
            }
            let embed = new Discord.RichEmbed()
            .setTitle(':gift: You now have the selfrole ' + role.name + '.')
            .setColor(color)
            message.channel.send(embed).catch(console.error);
          }
        });
      }
      
    } else if (args[0] == 'remove') {
      
      if (args[1] == 'all') {
        message.member.roles.forEach(function(role){
          if (role.name.startsWith('+')) {
            message.member.removeRole(role);
          }
        });
        let color = "#ffa500"
        if (message.guild !== null) {
          color = message.guild.me.displayColor;
        }
        let embed = new Discord.RichEmbed()
        .setTitle(':fire: Your selfroles have been removed.')
        .setColor(color)
        message.channel.send(embed).catch(console.error);
      } else {
        if (args[1].startsWith('+')) {} else{
          args[1] = '+' + args[1];
        }
        message.member.roles.forEach(function(role){
          if (role.name.toLowerCase() == args[1].toLowerCase()) {
            message.member.removeRole(role);
            let color = '#31C119';
            let embed = new Discord.RichEmbed()
            .setTitle(':fire: Your selfrole ' + role.name + ' has been removed.')
            .setColor(color)
            message.channel.send(embed).catch(console.error);
          }
        });
      }
                 
    } else if (args[0] == 'list') {
      let color = "#ffa500"
      if (message.guild !== null) {
        color = message.guild.me.displayColor;
      }
      let embed = new Discord.RichEmbed()
      .setTitle("Selfroles")
      .setAuthor(message.author.username)
      .setColor(color)
      .setFooter('Selfrole names start with the + symbol. To get or remove a selfrole, type ' + process.env.prefix + 'role get/remove (role)/all.')
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