const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let replies = ["Один", "Два", "Три", "Четыре", "Пять", "Шесть"];
    let result = Math.floor((Math.random() * replies.length));

    message.delete().catch(O_o => {});

    try {
        let newembed = new Discord.RichEmbed()
            .setAuthor("Кость была брошена!")
            .setColor("#00FF00")
            .setDescription(message.author.username + "\nРезультвт: " + replies[result]);

        message.channel.send({
            embed: newembed
        });
    } catch (e) {
        console.log(e.stack);
    }; // The try is because it errored when I didn't do it.
};

module.exports.help = {
    name: "dice"
}