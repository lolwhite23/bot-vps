const Discord = require('discord.js')
const moment = require('moment')
const m = require('moment-duration-format')
var d = new Date,
format =[d.getMonth()+1, d.getDate(), d.getFullYear()].join('/')+' '+ d.getHours();

exports.run = async(bot, message, args) => {
    let embed = new Discord.RichEmbed()
    .setTitle("Server information")
    .setColor("BLUE")
    .setThumbnail(message.guild.iconURL)
    .addField("Server name:", message.guild.name, true)
    .addField("Created on:", moment(message.guild.createdAt).format("MM/DD/YYYY"), true)
    .addField("You joined:", moment(message.member.joinedAt).format("MM/DD/YYYY"), true)
    .addField("Server region:", message.guild.region, true)
    .addField("Guild owner:", message.guild.owner, true)
    .addField("Total members:", message.guild.memberCount, true)
    message.channel.send(embed)
}

exports.command = {
    name: 'serverinfo',
    aliases: ["si"],
    category: 'Util',
    description: 'Show you the server information.'
}