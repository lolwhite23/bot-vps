require('dotenv/config');
const Discord = require('discord.js');

module.exports.run = async(bot, message, args3) => {
    const ownerID = process.env.owner;
if (message.author.id !== ownerID) return message.channel.send("You are not authorized to use this command.");
let string = '';

bot.guilds.forEach(guild => {
    string += '***Server Name:*** ' + guild.name + '\n' + '***Server ID:***` ' + guild.id + ' ` ' + '\n' + '***Owner Tag:*** `' + guild.owner.user.tag + ' ` ' + '\n' + '***Owner ID:*** `' + guild.owner.id + ' ` ' + '\n' + '***Member Count:*** `'+ guild.memberCount + ' ` ' + '\n\n';

})

let botembed = new Discord.RichEmbed()
    .setColor("#000FF")
    .addField("Guild List:", string)
    .setTimestamp()
    .setFooter("Command Ran By: " + message.author.username, message.author.avatarURL);
message.channel.send(botembed);
}
exports.command = {
    name: 'guildlist',
    aliases: ["gl"],
    category: "Bot Owner",
    description: "A really long thing that shows all servers.",
    usage: "guildlist"
}