const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {
    let a = message.author
    let embed = new Discord.RichEmbed()
    .setTitle("**__Меню сервера:__**")
    .setColor('GOLD')
    .setDescription("[Мат разрешён, но злоупотреблять им не стоит (считается нарушением)]\n= Мут от 15 до 60 минут =\n[Запрещены оскорбления в чей-либо адрес]\n= Мут от 30 до 90 минут =\n[Фейковые жалобы (репорты) на пользователей]\n= Предупреждение, Блокировка =\n[Плагиат чужого профиля без его согласия]\n= Блокировка =\n[Запрещено распространять личную информацию человека без его согласия]\n= Блокировка =\n[Запрещено использовать и утаивать баги]\n= Предупреждение-Блокировка =\n[Неадекватное поведение]\n= Устное предупреждение. Мут от 15 до 60 =")
    .setImage("https://pp.userapi.com/c854016/v854016760/47613/phcbMfpGBhI.jpg")
    .setFooter("✧Fallen Angel✧#9448",a.avatarURL)
    .setThumbnail("https://images-ext-1.discordapp.net/external/Ipzu3_qhD9rJ6lslPYFAIbIZhjIh0sWikxfrl5J1pY4/https/cdn.discordapp.com/attachments/539097426678513705/561707755199660042/32.png");

    bot.send(embed);

};
module.exports.help = {
    name: "rules2"
};