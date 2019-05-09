const Discord = require('discord.js');

exports.command = {
    name: 'showsettings',
    category: "Util",
    description: "Shows all settings for your server."
}

exports.run = async(bot, message, args) => {
    let welcomechannel = bot.guildSettings.get(message.guild.id, "welcomename")
    let welcomemessage = bot.guildSettings.get(message.guild.id, "welcomemsg")
    
    let embed = new Discord.RichEmbed()
    .addField(welcomechannel)
    message.channel.send(embed)
}