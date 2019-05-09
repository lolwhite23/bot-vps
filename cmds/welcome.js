const Discord = require('discord.js');

exports.command = {
    name: 'welcome',
    aliases: ["w"],
    description: "Allows you to edit welcome stuff.",
    usage: 'welcome',
    category: "Moderation"
}

exports.run = async(bot, message, args) => {
    
    if(!args[0]){
        let embed = new Discord.RichEmbed()
        .addField("On:", "Turns in server welcome messages on.")
        .addField("DMon:", "Turns on DM join messages.")
        .addField("Off:", "Turns in server welcome messages off.")
        message.channel.send(embed)
    }
    switch(args[0]) {
        case 'on':
        if (message.member.hasPermission('ADMINISTRATOR')) {
            bot.guildSettings.set(message.guild.id,'true',"welcome")
            let welcomechannelset = bot.guildSettings.has(message.guild.id, "welcomeID")
            if(welcomechannelset === 'false'){
                message.channel.send("Please set a welcome channel first with setchannel #channel");
                return;
            }
            let embed = new Discord.RichEmbed()
            .addField("Welcome messages on!", '_ _')
            message.channel.send(embed)
        }
        break;
        case 'off':
        if (message.member.hasPermission('ADMINISTRATOR')) {
            bot.guildSettings.set(message.guild.id,'false',"welcome")
            let embed = new Discord.RichEmbed()
            .addField("Welcome messages off!", '_ _')
            message.channel.send(embed)
        }
        break;
        case 'set': 
        if (message.member.hasPermission('ADMINISTRATOR')) {
            let welcomemsg = args.join(' ').slice(args[0].length).trim()
            if(welcomemsg.length < 1) return message.channel.send("Pleas provide a welcome message!")
            bot.guildSettings.set(message.guild.id, welcomemsg, "welcomemsg")
            let embed = new Discord.RichEmbed()
            .addField(`Welcome message changed ${welcomemsg}`)
            message.channel.send(embed)
        }
        break;
        case 'setchannel':
        if (message.member.hasPermission('ADMINISTRATOR')) {
            let welcomechannel = message.mentions.channels.first()
            bot.guildSettings.set(message.guild.id, welcomechannel.id, "welcomeID")
            let embed = new Discord.RichEmbed()
            .addField(`Welcome channel changed to #${welcomechannel.name}`)
            message.channel.send(embed)
        }
        break;
        case 'dmset':
        if (message.member.hasPermission('ADMINISTRATOR')) {
            let welcomeDMmsg = args.join(' ').slice(args[0].length).trim()
            bot.guildSettings.set(message.guild.id, welcomeDMmsg, "welcomeDMmsg")
            let embed = new Discord.RichEmbed()
            .addField(`DM welcome message changed to "${welcomeDMmsg}"`)
            message.channel.send(embed)
        }
        break;
        
    }
}