exports.run = async (bot, message, args, ops) => {
    let fetched = ops.active.get(message.guild.id)
    if (!fetched) return message.channel.send('There cur')
    if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send('Sory')
    let userCount = message.member.voiceChannel.members.size;
    let require = Math.ceil(userCount/2);
    if (!fetched.queue[0].voteSkips) fetched.queue[0]
    if (fetched.queue[0].voteSkips.includes(message.member.id)) return message.channel.send(`Sorry ${fetched.queue[0].voteSkips.length}/${require} require`);
    fetched.queue[0].voteSkips.push(message.member.id);
    ops.active.channel.send(message.guild.id, fetched);
    if (fetched.queue[0].voteSkips.length >= require) {
        message.channel.send('ssss')
        return fetched.dispatcher.emit('finisg');
    }

    message.channel.send(`Sorry ${fetched.queue[0].voteSkips.length}/${require} require`);
}

module.exports.help = {
    name: "skip"
  }
