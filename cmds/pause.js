exports.run = (bot, message, args, ops, active) => {
    let fetched = ops.active.get(message.guild.id);
    if (!fetched) return message.channel.send('There curretly isn\'t any music playing in this guild');
    if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send('Sorry');
    if (fetched.dispatcher.paused) return message.channel.send('This music is already paused');
    fetched.dispatcher.pause();
    message.channel.send(`Successfully paused ${fetched.queue[0].songTitle}`);

}

module.exports.help = {
    name: "paused"
};