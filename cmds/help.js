module.exports.help = {
   name: "help"
} 

const Discord = require("discord.js");

exports.run = async (client, message, args, tools, con) => {
try {
    await message.author.send(`**__Команды нашего сервера__**: \n\n.add${client.commands.map(cmd => `\`${cmd.help.name}\``).join(", ")}`);
    message.channel.send("Помощь отправлена вам в лс");
} catch (e) {
    throw e;
}
}
