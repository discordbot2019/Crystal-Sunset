const { RichEmbed } = require('discord.js');
exports.run = (client, message, args) => {
    // Tries to get the first mentioned role or a role ID or a role name (role names are case sensitive)
    let role = message.mentions.roles.first() || message.guild.roles.get(args[0]) || message.guild.roles.find(role => role.name === args[0]);

    // If we can't find any role, then just default to the author's highest role
    if (!role) role = message.member.highestRole;


    // Define our embed
    const embed = new RichEmbed()
        .setColor("#f4e842")
        .setTitle(`Роль: ${role.name}`)
        .addField('Участников с ролью', role.members.size, true)
        .addField('Цвет роли', role.hexColor, true)
        .addField('Дата создания', role.createdAt.toDateString(), true)
        .addField('Редактирование', role.editable.toString(), true)
        .addField('Регулируемая', role.managed.toString(), true)
        .addField('ID', role.id, true);
    return message.channel.send({
        embed: embed

    })
};   
module.exports.help = {
    name: "role"
};