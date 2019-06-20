const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(":x: **Mesajları kontrol etme yetkin yok!**");
  if(!args[0]) return message.channel.send(":x: **Lütfen bir sayı giriniz.**");
  message.channel.bulkDelete(args[0]).then(() => {
  message.channel.send(`:pencil2: **${args[0]}** Mesaj Silindi`).then(msg => msg.delete(2000));
});

}

module.exports.help = {
  name: "sil"
}