const Discord = require("discord.js");

exports.run = (client, message, args) => {
    const figlet = require('figlet');
    if (args[0]) {
        if (args[0] == 'fonts') {
            function chunkSubstr(str, size) {
                //https://stackoverflow.com/a/29202760
                const numChunks = Math.ceil(str.length / size)
                const chunks = new Array(numChunks)

                for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
                    chunks[i] = str.substr(o, size)
                }

                return chunks
            }
            figlet.fonts(function(err, fonts) {
                if (err) {
                    console.log('something went wrong...');
                    console.dir(err);
                    return;
                }
                for (var i = fonts.length - 1; i >= 0; i--) {
                    // https://stackoverflow.com/a/5767335
                    if (fonts[i].includes(' ')) {
                        fonts.splice(i, 1);
                    }
                }
                let fontlist = chunkSubstr(fonts.join(', '), 1900)
                message.channel.send('__***Fonts***__').catch(console.error);
                fontlist.forEach(function(item) {
                    message.channel.send('```' + item + '```').catch(console.error);
                })
            });

        } else {
            let txt = JSON.parse(JSON.stringify(args));; // make a copy of args without the font
            txt.shift();
            figlet.text(txt.join(" "), {
                font: args[0],
                horizontalLayout: 'default',
                verticalLayout: 'default'
            }, function(err, data) {
                if (err) {

                    figlet.text(args.join(" "), {
                        horizontalLayout: 'default',
                        verticalLayout: 'default'
                    }, function(err, data) {
                        if (err) {
                            let color = '#C1192A';
                            let embed = new Discord.RichEmbed()
                                .setColor(color)
                                .setTitle("Something went wrong..")
                            message.channel.send(embed).catch(console.error);
                            console.dir(err);
                            return;
                        } else {
                          message.channel.send('```' + data + '```').catch(console.error);
                        }
                    });
                  
                } else {
                  message.channel.send('```' + data + '```').catch(console.error);
                }
            });

        }
    } else {
        let color = '#C1192A';
        let embed = new Discord.RichEmbed()
            .setColor(color)
            .setTitle("Hm?")
            .setDescription("What do you want to say, and what font do you want to use? c!figlet (font) (text), or you can do c!figlet fonts to see all available fonts.")
        message.channel.send(embed).catch(console.error);
    }
}