const Discord = require('discord.js');
const bot = new Discord.Client();
const economy = require('discord-economy');
const exp = require('./functions/exp.js')
bot.commands = new Discord.Collection();
const fs = require('fs');
bot.mutes = require('./mutes.json');
let config = require('./botconfig.json');
let token = config.token;
let prefix = config.prefix;
let profile = require('./profile.json');
fs.readdir('./cmds/',(err,files)=>{
    if(err) console.log(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <=0) console.log("Нет комманд для загрузки!!");
    console.log(`Загружено ${jsfiles.length} комманд`);
    jsfiles.forEach((f,i) =>{
        let props = require(`./cmds/${f}`);
        console.log(`${i+1}.${f} Загружен!`);
        bot.commands.set(props.help.name,props);
    });
});


bot.on('ready', () => {
    console.log(`Запустился бот ${bot.user.username}`);
    bot.generateInvite(["ADMINISTRATOR"]).then(link =>{
        console.log(link);
    });
    bot.setInterval(()=>{
        for(let i in bot.mutes){
            let time = bot.mutes[i].time;
            let guildid = bot.mutes[i].guild;
            let guild = bot.guilds.get(guildid);
            let member = guild.members.get(i);
            let muteRole = member.guild.roles.find(r => r.name === "Muted"); 
            if(!muteRole) continue;

            if(Date.now()>= time){
                member.removeRole(muteRole);
                delete bot.mutes[i];
                fs.writeFile('./mutes.json',JSON.stringify(bot.mutes),(err)=>{
                    if(err) console.log(err);
                });
            }
        }

    },5000)

});

bot.on('guildMemberAdd',(member)=>{
    let role = member.guild.roles.find(r => r.name === "♂");
    member.addRole(role);
});
bot.on('guildMemberAdd', member => {
    let channel = member.guild.channels.find('name', '🕵︙туристы');
    let memberavatar = member.user.avatarURL
        if(!channel) return;
        let embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setImage('C:\Users\люда\Downloads\63e12981e212a1c6 (1)')
        .addField(':bust_in_silhouette: | Name :', `${member}`)
        .addField(':microphone2: | Welcome', `Добро пожаловать на сервер, ${member}`)
        .addField(':id: | User :', "**[" + `${member.id}` + "]**")
        .addField(':family_mwgb: | Your are the member', `${member.guild.memberCount}`)
        .addField("Name", `<@` + `${member.id}` + `>`, true )
        .addField('Server', `${member.guild.name}`, true )
        .setFooter(`**${member.guild.name}**`)

        .setTimestamp()

        channel.sendEmbed(embed);
});

bot.on('guildMemberAdd', member => {

    console.log(`${member}`, "has joined" + `${member.guild.name}`)

});

bot.on('guildMemberRemove', member => {
    let channel = member.guild.channels.find('name', '🕵︙туристы');
    let memberavatar = member.user.avatarURL
        if(!channel) return;
        let embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setImage('https://media.giphy.com/media/Y4z9olnoVl5QI/giphy.gif')
        .addField('Имя', `${member}`)
        .addField('Покинул сервер', ';(')
        .addField('Удачи дружище :(', 'We will missy you!')
        .addField('The server now as', `${member.guild.memberCount}` + "members")
        .setFooter(`**${member.guild.name}`)
        .setTimestamp()

        channel.sendEmbed(embed);
});
bot.on('guildMemberRemove', member => {
    console.log(`${member}` + "has left" + `${member.guild.name}` + "Sending leave message now")
    console.log("Leave Message Sent")
});
bot.on('guildMemberAdd',(member)=>{
    let role = member.guild.roles.find(r => r.name === "[I]Незнакомчик");
    member.addRole(role);
});

bot.on('message', async message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;
    let uid = message.author.id;
    bot.send = function (msg){
        message.channel.send(msg);
    };
    if(!profile[uid]){
        profile[uid] ={
            coins:10,
            warns:0,
            xp:0,
            lvl:1,
        };
    };
    let u = profile[uid];

    u.coins++;
    u.xp++;

    if(u.xp>= (u.lvl * 5)){
        u.xp = 0;
        u.lvl += 1;
    };


    fs.writeFile('./profile.json',JSON.stringify(profile),(err)=>{
        if(err) console.log(err);
    });

    let messageArray = message.content.split(" ");
    let command = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);
    if(!message.content.startsWith(prefix)) return;
    let cmd = bot.commands.get(command.slice(prefix.length));
    if(cmd) cmd.run(bot,message,args);
    bot.rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    bot.uId = message.author.id;
});
bot.on("ready", () => {
    // This event will run if the bot starts, and logs in, successfully.
    console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`); 
    // Example of changing the bot's playing game to something useful. `client.user` is what the
    // docs refer to as the "ClientUser".
    bot.user.setActivity(`Cмотрит на ${bot.users.size} участников сервера`);
  });
  
  bot.on("guildCreate", guild => {
    //  when the bot joins a guild.
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    bot.user.setActivity(`Serving ${bot.guilds.size} servers | !help`);
  });
  
  bot.on("guildDelete", guild => {
    // when the bot is removed from a guild.
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    bot.user.setActivity(`Serving ${bot.guilds.size} servers | !help`);
});

bot.login('NTY3MzA3OTE0MTA5NTE3ODI0.XPFz2g.R583PDmoQ1814Qk_CLBEyZLzLqg');