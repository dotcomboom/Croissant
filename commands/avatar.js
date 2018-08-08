exports.run = (client, message, args) => {
    if (message.mentions.members.size == 0) {
      message.channel.send(message.author.username + "'s avatar:\n" + message.author.avatarURL).catch(console.error);
    } else {
      let member = message.mentions.users.first();
      message.channel.send(member.username + "'s avatar:\n" + member.avatarURL).catch(console.error);
    }
}