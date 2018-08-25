const Discord = require("discord.js");
const Gopher = require("gopher-lib");
exports.run = (client, message, args) => {
    if (!args[0]) {
      args[0] = 'gopher://tilde.town/1/~dcb/gopherit';
    }
    var resource = new Gopher.Resource( args[0] );
    //var uri = resource.toURI()
    function chunkSubstr(str, size) {
       //https://stackoverflow.com/a/29202760
       const numChunks = Math.ceil(str.length / size)
       const chunks = new Array(numChunks)
      for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
         chunks[i] = str.substr(o, size)
       }
      return chunks
    }
  
    var client = new Gopher.Client({parseDir:true, timeout: 5000});
  
    client.get(resource, (err, reply)=>{
      if (err) {
        message.react("👎").then().catch(console.error);
      	console.error(err);
      } else {
        if (reply.text) {
          message.react("✅").then(function () {
            message.react("📰").then().catch(console.error);
          }).catch(console.error);
          message.channel.send('**:newspaper: Gopher resource: `' + args[0] + '`**').then().catch(console.error);
          let chunks = chunkSubstr(reply.text, 1900)
          chunks.forEach(function(chunk) {
            message.channel.send('```' + chunk + '```').then().catch(console.error);
          });
        } else {
          message.react("✅").then(function () {
            message.react("📁").then(function () {}).catch(console.error);
          }).catch(console.error);
          
          message.channel.send('**:file_folder: Gopher directory: `' + args[0] + '`**').then().catch(console.error);
          
          let resources = [];
          
          reply['directory'].forEach(function(item) {
            if (item.type == 'i') {
              if (item.name.length > 1) {
                resources.push(':arrow_forward: :information_source: `' + item.name + '`');
              }
            } else if (item.type == '1') {
              resources.push(':arrow_forward: :file_folder: `' + item.name + '` (' + 'gopher://' + item.host + ':' + item.port + '/' + item.type + item.selector + ')');
            } else if (item.type == '0') {
              resources.push(':arrow_forward: :newspaper: `' + item.name + '` (' + 'gopher://' + item.host + ':' + item.port + '/' + item.type + item.selector + ')');
            } else if (item.type == 'h') {
              if (item.selector.indexOf('URL:') !== -1) {
                  resources.push(':arrow_forward: :spider_web: `' + item.name + '` (' + item.selector.replace('URL:', '', 1).replace(':/','://').replace(':///', '://') + ')');
              } else {
                resources.push(':arrow_forward: :interrobang: `' + item.name + '`');
              }
            } else {
              resources.push(':arrow_forward: :interrobang: `' + item.name + '`');
            }
          });
          
          let group = '';
          
          resources.forEach(function(resource) {
            if (group.length > 1000) {
              message.channel.send(group).then(group = '').catch(console.error);
            }
            group = group + '\n' + resource;
          });
          message.channel.send(group + '\n*To navigate to another gopher url, use c!gopher [url].*\n*Only information (type i), directories (type 1), text files (type 0), and external links (type h) are supported.*').then(group = '').catch(console.error);
        }
      }
    });
}