exports.run = (bot, message, args, ops) => {
    if (!message.member.voiceChnannel) return message.channel.send('Please connect to a voice channel');
    if (!message.guild.voiceChnannel) return message.channel.send('Sory, the bot isn\'t connect to the guild');
    if (message.guild.me.voiceChannelID !== message.memner.voiceChannelID) return message.channel.send('Sory, you aren\'t connected to the same channel');

    message.guild.me.voiceChannel.leave();

    message.channel.send('Leaving Channel...');
}

module.exports.help = {
    name: "leave"
}