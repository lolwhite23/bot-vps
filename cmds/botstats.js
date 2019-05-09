const Discord = require('discord.js');
const {
    version
} = require("discord.js");
const moment = require("moment");
const m = require("moment-duration-format");
let os = require('os')
let cpuStat = require("cpu-stat")
const ms = require("ms")


module.exports.command = {
    name: "stats",
    aliases: ["botstats"],
    description: "Shows the stats for the bot!",
    category: "Util",
    usage: "stats"
}

module.exports.run = async(bot,message,args) => {
    cpuStat.usagePercent(function(err, percent, seconds) {
        if (err) {
            return console.log(err);
        }
    const duration = moment.duration(bot.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
    const embed = new Discord.RichEmbed()
    .setAuthor("Bot Stats", bot.user.displayAvatarURL)
    .setTitle(`***Shard #${bot.shard.id+1}***`)
    .addField("System:", `**Memory:** \n\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB\` \n **CPU:** \n \`${percent.toFixed(2)}%\` \n **Discord.js Version:** \n \`v${version}\` \n **Node.js Version:** \n \`${process.version}\`\n **OS:** \n \`${os.platform()}\``, true)
    .addField("Gen Stats:", `**Users:** \n ${bot.users.size} \n **Guilds:** \n ${bot.guilds.size} \n **Channels:** \n ${bot.channels.size}`, true)
    .setFooter(`Uptime: ${duration}`)

    message.channel.send(embed)
    });
}
