const Discord = require('discord.js');

exports.command = {
    name: "setwelcome",
    aliases: ["sw"],
    category: "Moderation",
    description: "Changes the welcome settings for a server."
}

exports.run = async(bot, message, args) => {
    if(!args[0]){
        let embed = new Discord.RichEmbed()
        .setAuthor("Welcome help", bot.user.displayAvatarURL)
        .addField("channel:", "Sets the welcome channel Usage: setwelcome channel #channel")
        .addField("welcomeon:", "Turns in-server welcome on")
        .addField("dmwelcomeon:", "Turns DM welcome on")
        .addField("welcomeoff", "Turns in-server welcome off")
        message.channel.send(embed)
    }
    switch(args[0]) {
        case 'welcomeon':
        if (message.member.hasPermission('ADMINISTRATOR')) {
            bot.guildSettings.set(message.guild.id,'true',"welcome")
            message.channel.send("welcome on!")
        } 
    }
}