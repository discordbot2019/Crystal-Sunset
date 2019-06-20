const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {
    let a = message.author
    let embed = new Discord.RichEmbed()
    .addField("Ваш профиль :", `${message.author.username}`, inline = true)
              .setTimestamp(new Date())
              .setColor("#4286f4")
              .setFooter("-Crystal Sunset-", `${bot.user.avatarURL}`)
              .setThumbnail(`${message.author.avatarURL}`)
              .addField("Название сервера",message.guild.name)
              .addField("Вы находитесь в канале",message.channel)
              .addField("Баланс",message.guild.balance)
              .addField("Кол-Во участников",message.guild.memberCount)
              .addField("Регион",message.guild.region)
              .setThumbnail(message.guild.iconURL)

    bot.send(embed);

};
module.exports.help = {
    name: "profile"
};