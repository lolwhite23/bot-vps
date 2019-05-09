exports.run = async(bot, message, args) => {
    const Discord = require('discord.js');

const List = message.guild.emojis.map(e => e.toString()).join(" ");

const EmojiList = new Discord.RichEmbed() //Embed Constructor || If lower than v12.0.0 | Use RichEmbed
    .setTitle('➠ Emoji\'s') //Title
    .setColor('RANDOM') //Random colour || Any HexCode Can be used Instead
    .setDescription(List) //Here will List of Emoji's
    .setTimestamp() //The timestamp of this embed
    .setFooter(message.guild.name) //Change To Anything As You Wish
message.channel.send(EmojiList) //Sends to Channel

//------------------------------------------------------------------------------
//If You pefer not to send in an Embed
//Try
message.channel.send(List); //sends to Channel Without Embed
}
exports.command ={
    name: "emoji"
}

