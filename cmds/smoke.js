exports.run = async (client, message, level) => {
    message.channel.send('**Начал курить**').then(async msg => {
    setTimeout(() => {
      msg.edit('🚬');
    }, 500);
    setTimeout(() => {
      msg.edit('🚬 ☁ ');
    }, 1000);
    setTimeout(() => {
      msg.edit('🚬 ☁☁ ');
    }, 1500);
    setTimeout(() => {
      msg.edit('🚬 ☁☁☁ ');
    }, 2000);
    setTimeout(() => {
      msg.edit('🚬 ☁☁');
    }, 2500);
    setTimeout(() => {
      msg.edit('🚬 ☁');
    }, 3000);
    setTimeout(() => {
      msg.edit('🚬 ');
    }, 3500);
    setTimeout(() => {
      msg.edit(`Закончил курить`);
    }, 4000);
  });
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
  };
  
  exports.help = {
    name: "smoke",
    category: "Fun",
    description: "Smoke weed everyday :dab:",
    usage: "smoke"
  };

  module.exports.help = {
    name: "smoke"
};