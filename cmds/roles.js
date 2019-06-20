const Discord = require("discord.js");
const botconfig = require("../config.json");

module.exports.run = async (bot, message, args) => {

  let prefix = ".";
  if (!message.content.startsWith(prefix)) return;



    let serverembed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .addField("**__-Ладно-ладно, давай вместе\n-Вот роли моей команды:__**",` \n ${message.guild.roles.size} Roles  \n Names : \n ${message.guild.roles.array()}`,true)
    .setTimestamp()
    .setFooter(`${message.author.username}#${message.author.discriminator}`,message.author.displayAvatarURL);

    message.channel.send(serverembed);
}

module.exports.help = {
  name:"roles"
}