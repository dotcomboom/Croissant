exports.run = (client, message, args) => {
  const embed = {
        "color": 4886754,
        "description": args.join(' ').replace("@everyone", "everyone").replace("@here", "here")
    };
    message.channel.send({embed}).catch(console.error);
}