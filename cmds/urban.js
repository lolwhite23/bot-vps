const urban = require('urban'), 
  Discord = require('discord.js');


exports.run = async (bot, message, args) => {
  if(args.length < 1) return message.channel.send("**Please specify something to define**")
  let str = args.join(' ');

  urban(str).first(json => {
    if(!json) return message.channel.send("***No definiton found for this word***");
    let image = "https://media.discordapp.net/attachments/552665870128775169/574760649998204929/246x0w.jpg"
    let embed = new Discord.RichEmbed()
    .setAuthor("Urban Dictonary", image)
    .setTitle(json.word).setURL(json.permalink)
    .setDescription(json.definition)
    .addField("Example:", json.example)
    .addField("Upvotes:", json.thumbs_up, true)
    .addField("Downvotes:", json.thumbs_down, true)
    .setFooter(`Definition By: ${json.author}`)

    message.channel.send(embed)


  })
}
exports.command = {
    name: "urban",
    aliases: ["ud"],
    description: "Shows you a urban dictonary definition.",
    category: "Fun",
    usage: "urban <definiton>"
}
