const Discord = require("discord.js")

module.exports.command = {
    name: "help",
    aliases: [""],
    description: "Shows all bot commands.",
    category: "Util",
    usage: "help (command)"
}

exports.run = async (bot, message, args) => {
    let commandSize = 0
    let embed = new Discord.RichEmbed().setColor("RANDOM")

    if (!args[0]) {
        let categories =
            bot.commands
                .map(c => c.command.category)
                .reduce((a, b) => {
                    if (a.indexOf(b) < 0) a.push(b)
                    return a
                }, []).sort()

        embed.setAuthor("Commands List", message.author.avatarURL)
        categories.forEach(c => {
            let commands = bot.commands.filter(
                command => command.command.category == c
            )
            commands = commands.map(cmd => cmd.command.name)
            if (commands.length <= 0) return;
            commandSize += commands.length
            embed.addField(c, `\`${commands.sort().join("`, `")}\``)
        })
        embed.setFooter(`Total commands: ${commandSize}`)
        embed.setColor("#2c2f33")

        return message.channel.send(embed)
    }
}