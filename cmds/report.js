const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    var canal = message.guild.channels.find('name', '📚︙admins');
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member)
        return message.reply("Пользователь не найден.");
    let reason = args.slice(1).join(' ');
    if (!reason) reason = "Не сообщается.";
    let embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(message.author.avatarURL)
        .setTitle(`Репорт:`)
        .addField('Кто сообщил:', message.author)
        .addField('\n\n Кому сообщили:', member.user)
        .addField('\n\n Причина::', reason)
        .setFooter(`Представлено ${message.author.username}.`)
        .setTimestamp()
    canal.send(embed);
}

module.exports.help = {
    name: "report"
}