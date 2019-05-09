require('dotenv/config');

exports.command = {
    name: 'setprefix',
    aliases: ["sp"],
    description: "Changes the prefix of the bot.",
    category: "Moderation",
    usage: "setprefix <prefix>"
}


exports.run = async(bot, message, args3, db, Discord) => {
    if(!message.member.hasPermission("ADMINISTRATOR")){
        return message.channel.send("Invalid Perms.")
    }
    
    let nPrefix = args3[0];
    if(!nPrefix)return message.channel.send("Please provide a prefix!")
    let embed = new Discord.RichEmbed()
    .setAuthor("Prefix Change", bot.user.displayAvatarURL)
    .setColor("#838283")
    .addField(`Prefix is now (**${nPrefix}**)`, '_ _')
    .setTimestamp()
    bot.guildSettings.set(message.guild.id,nPrefix,"prefix")
    message.channel.send(embed);
    if(args3[0] === 'default'){
        let nPrefix = '>'
        bot.guildSettings.set(message.guild.id,nPrefix,"prefix")
        let embed2 = new Discord.RichEmbed()
        .setAuthor("Prefix Change", bot.user.displayAvatarURL)
        .setColor("#838283")
        .addField(`Prefix is now (**${nPrefix}**)`, '_ _')
        .setTimestamp()
        message.channel.send(embed2)
    }
}

