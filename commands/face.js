exports.run = (client, message, args) => {
    var cool = require('cool-ascii-faces')
    message.channel.send(cool()).catch(console.error);
}