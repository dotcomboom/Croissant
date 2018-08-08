exports.run = (client, message, args) => {
    const cowsay = require("cowsay");
    message.channel.send(('```' + cowsay.say({text : message.toString().replace(process.env.prefix + 'cowsay ','')})) + '```').catch(console.error);
}