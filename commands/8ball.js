exports.run = (client, message, args) => {
    if (args.length < 1) {
      message.channel.send("How can I answer your question if you never asked it?");
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