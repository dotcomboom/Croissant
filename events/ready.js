exports.run = (client) => {
  client.user.setPresence({ game: { name: process.env.game, type: 0 } });
  console.log(`Croissant is ready!`)
  console.log(`Stats: Croissant is on ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users!`);
}