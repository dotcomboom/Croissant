exports.run = (client, message, args) => {
    message.channel.send(`I am on ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users!`).catch(console.error);
}