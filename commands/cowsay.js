exports.run = (client, message, args) => {
    const cowsay = require("cowsay");
    message.channel.send(('```' + cowsay.say({text : args.join(' ')})) + '```').catch(console.error);
}