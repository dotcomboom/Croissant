exports.run = (client) => {
  client.user.setPresence({ game: { name: process.env.game, type: 0 } });
  
  //discordbotlist server count updates
  if (process.env.dbltoken) {
    const DBL = require("dblapi.js");
    const dbl = new DBL(process.env.dbltoken, client);
    
    dbl.on('posted', () => {
      console.log('Server count posted!');
    })
    
    dbl.postStats(client.guilds.size);
    setInterval(() => {
        dbl.postStats(client.guilds.size);
    }, 1800000);
    
  } else {
    console.log('Discord Bot List token (dbltoken) was not found in .env! Server counts will not be sent to Discord Bot List.')
  }
  
  console.log(`${client.user.username} is ready!`)
  console.log(`Stats: ${client.user.username} is on ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users!`);
}