const Discord = require('discord.js');
const moment = require('moment');


exports.command = {
    name: "userinfo",
    aliases: ["ui", "usrinfo"],
    description: "Shows information about a user",
    usage: "userinfo <@person> or userinfo",
    category: "Util"
}

exports.run = async(bot, message, args) => {    
    let status = '';

    let user = message.guild.member(message.mentions.users.first() || message.author);
    if(user.user.presence.status === 'dnd'){
        status += "<a:dnd:575399526618365982> Do not Disturb" 
    }
    if(user.user.presence.status === 'online'){
        status += "<a:online:575314838624927768> Online"
    }
    if(user.user.presence.status === 'idle'){
        status += "<a:idle:575399472054665252> Idle"
    }
    if(user.user.presence.status === 'streaming'){
        status += "<a:streaming:575399597942243379> Streaming"
    }
    if(user.user.presence.status === 'offline'){
        status += "<a:offline:575402461330800650> Offline"
    }

    let embed = new Discord.RichEmbed().setColor("#10AADF")
    .setAuthor(`${user.user.username}'s info`, user.user.displayAvatarURL)
    .setThumbnail(user.user.displayAvatarURL)
    .addField("Bot Account?", user.user.bot, true)
    .addField("Status:", status, true)
    .addField("Game:", `${user.presence.game ? user.presence.game.name : 'None'}`, true)
    .addField('Nickname:', user.guild.member(user).displayName, true)
    .addField(`Tag:`, user.user.tag, true)
    .addField(`Created At:`, `${moment.utc(user.user.createdAt).format('MM/DD/YYYY')}`, true)
    .addField("Joined Server:", `${moment.utc(user.joinedAt).format('MM/DD/YYYY')}`, true)
    .addField(`Last Message:`, `${user.user.lastMessage ? user.user.lastMessage : 'Null'}`, true)
    .addField("Roles:", user.roles.array(roles => `${roles.name}`).join(' | '))
    .setFooter(`${user.user.username}'s ID: ${user.id}`)


    message.channel.send(embed)
}
