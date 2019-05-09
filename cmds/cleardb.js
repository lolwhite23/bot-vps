const Enmap = require('enmap')

const defaultsettings = require('../util/defaultSettings.js')
require('dotenv/config')

exports.run = async(bot, message, args) => {
    function createserver(guildid, object){
        bot.guildSettings.ensure(guildid, object)
    }

    bot.guildSettings.deleteAll(false)
    bot.guilds.forEach(guild => {
        createserver(guild.id, defaultsettings)
    });
    return message.reply("Database Cleared.")


}
exports.command = {
    name: 'cleardb',
    aliases: ["cdb"],
    description: "Clears the database for the bot.",
    category: 'Bot Owner'
}