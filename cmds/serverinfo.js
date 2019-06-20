const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {
    let verifilv = ['Отсутствует', 'Низкий', 'Средний', 'Высокий', 'Очень высокий']
    let online = message.guild.members.filter(member => member.user.presence.status !== 'offline');
    let day = message.guild.createdAt.getDate()
    let month = 1 + message.guild.createdAt.getMonth()
    let year = message.guild.createdAt.getFullYear()
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
   .setAuthor(message.guild.name, sicon)
   .setFooter(`Сервер создан • ${day}.${month}.${year}`)
   .setColor("#7289DA")
   .setThumbnail(sicon)
   .addField("ID", message.guild.id, true)
   .addField("Название сервера", message.guild.name, true)
   .addField('Уровень проверки', verifilv[message.guild.verificationLevel], true)
   .addField("Создатель сервера", message.guild.owner.user.tag, true)
   .addField("Регион сервера", message.guild.region, true)
   .addField("Каналов на сервере", message.guild.channels.size, true)
   .addField("AFK канал", message.guild.afkChannel.name,true)
   .addField("Участников на сервере", message.guild.memberCount, true)
   .addField("Смайликов", message.guild.emojis.sixe,true)
   .addField("Людей на сервере", message.guild.memberCount - message.guild.members.filter(m => m.user.bot).size, true)
   .addField("Ботов на сервера", message.guild.members.filter(m => m.user.bot).size, true)
   .addField("Онлайн на сервере", online.size, true)
   .addField("Ролей на сервере", message.guild.roles.size, true)
   .setTimestamp(new Date(message.guild.createdTimestamp))
   .setFooter(message.guild.name, sicon)


   message.channel.send(serverembed);

};
module.exports.help = {
    name: "serverinfo"
};