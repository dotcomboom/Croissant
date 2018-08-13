const Discord = require("discord.js");

exports.run = (client, message, args) => {
    if (args.length < 1) {
      message.channel.send(":interrobang: **What question do you want me to answer? c!8ball (question)**");
      return;
    } 
    var answers = [
      "Yeah!",
      "Nah...",
      "Maybe?",
      "Probably not...",
      "Probably",
      "Think about it...",
      "Most likely!",
      "Most unlikely...",
      "Ask a friend!",
      "What do you think?"
    ]
    var randomAnswer = answers[Math.floor(Math.random() * answers.length)];
  
    message.channel.send(':8ball: **`' + randomAnswer + '`** :8ball:').catch(console.error);
}