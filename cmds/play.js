const Discord = require("discord.js");
const ytdl = require('ytdl-core');

exports.run = async (bot, message, args, ops) => {
    let embed = new Discord.RichEmbed()
    if (!message.member.voiceChannel) return message.channel.send('Пожалуйста, подключитесь к голосовому каналу');
    if (message.guild.me.voiceChannel) return message.channel.send('Извините, бот уже подключен к гильдии');
    if (!args[0]) return message.channel.send('Извините, пожалуйста, введите URL после запятой');
    let validate = await ytdl.validateURL(args[0]);
    if (!validate) return message.channel.send('Извините, пожалуйста, введите ** действительный ** URL-адрес, следующий за командой');
    let info = await ytdl.getInfo(args[0]);
    let connection = await message.member.voiceChannel.join();
    let dispatcher = await connection.playStream(ytdl(args[0], {filter: 'audioonly'}))
    message.channel.send(`Сейчас играет: ${info.title}`)
}

module.exports.help = {
    name: "play"
}