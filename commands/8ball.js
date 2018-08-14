const Discord = require("discord.js");

exports.run = (client, message, args) => {
    if (args.length < 1) {
      let color = '#C1192A';
      let embed = new Discord.RichEmbed()
      .setColor(color)
      .setTitle("The 8-Ball says...")
      .setDescription(":8ball: **What question do you want me to answer? c!8ball (question)**")
      message.channel.send(embed).catch(console.error);
      return;
    } 
    var answers = [
      "Yeah!",
      "Nah...",
      "Maybe?",
      "Probably not...",
      "Probably!",
      "Think about it...",
      "Most likely!",
      "Most unlikely...",
      "Ask a friend!",
      "What do you think?"
    ]
    var randomAnswer = answers[Math.floor(Math.random() * answers.length)];
  
    
    let color = '#31C119';
    let embed = new Discord.RichEmbed()
    .setColor(color)
    .setTitle("The 8-Ball says...")
    .setDescription(":8ball: **" + randomAnswer + "**")
  
    message.channel.send(embed).catch(console.error);
}