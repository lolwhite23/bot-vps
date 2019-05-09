const Discord = require("discord.js")


const moment = require("moment");
const m = require("moment-duration-format");

exports.run = (bot, message, args) => { 
    
        let embed = new Discord.RichEmbed()
            .setTitle("Bot information")
            .setColor("RANDOM")
            .setThumbnail(bot.user.avatarURL)
            .addField("Bot name:", bot.user.username)
            .addField("Creator", "Reverso")
            .addField("Created at", (bot.user.createdAt))
            .addField("Guilds:", bot.guilds.size)
            .addField("Users:", bot.users.size)
            .addField("Website:", "[Coming Soon!](https://google.com/)")
    
        return message.channel.send(embed)
};


exports.command = {
    name: 'botinfo',
    aliases: ["bi"],
    description: "Shows info about the bot",
    category: 'Util'
}