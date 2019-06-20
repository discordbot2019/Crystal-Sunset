const search = require('yt-search');
const Discord = require("discord.js");
const fs = require("fs");
exports.run = (bot, message, args, ops, videos) => {

    search(args.join(' '), function(err, res) {
        if (err) return message.channel.send('Вы не выбрали музыку');
        let videos = res.videos.slice(0, 10);

        let resp = '';
        for (var i in videos) {
            resp += `**[${parseInt(i)+1}]:** \`${videos[i].title}\`\n`;
        }

        resp += `\n**Выберите номер между**  \`1-${videos.length}\``;

        message.channel.send(resp);

        const filter = m => !isNaN(m.content) && m.content < videos.length+1 && m.content > 0;
        const collector = message.channel.createMessageCollector(filter);
        collector.videos = videos
        collector.once('collect', function(m) {
        let commandFile = require(`./play.js`);
        commandFile.run(bot, message, [this.videos[parseInt(m.content)-1].url], ops)
    });
  });
}

exports.help = {
    name: "search"
}