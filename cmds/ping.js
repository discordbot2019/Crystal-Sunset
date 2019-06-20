const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    

    let msgping1 = new Date();

    let botping = new Date() - message.createdAt;

    let msgping2 = new Date() - msgping1;

    let pingembed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .addField('Пинг API : ', Math.floor(bot.ping) + 'ms')
        .addField('Пинг Бота : ', Math.floor(botping) + 'ms')
        .addField('Пинг отправки сообщений : ', '~' + Math.round(msgping2) + 'ms')
        .setTimestamp(new Date())
        .setFooter(`${message.author.tag}`);

        
    return message.channel.send(pingembed);
        

};

module.exports.help = {
    name: "ping"
};