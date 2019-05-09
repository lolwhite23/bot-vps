const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    
    let msgping1 = new Date();

    let botping = new Date() - message.createdAt;

    let msgping2 = new Date() - msgping1;

    let pingembed = new Discord.RichEmbed()
        .setColor("#838283")
        .setAuthor('Ping:')
        .addField('API Ping: ', Math.floor(bot.ping) + 'ms')
        .addField('Bot Ping: ', Math.floor(botping) + 'ms')
        .addField('Message Ping: ', '~' + Math.round(msgping2) + 'ms')
    message.channel.send(pingembed);
        

}

exports.command = {
    name: "ping",
    aliases: ["p"],
    category: 'Util',
    description: "Gives you the ping of the bot."
};
