require('dotenv/config')

exports.command = {
    name: "reboot",
    category: "Bot Owner",
    description: "Reboots the bot. Duh."
}

exports.run = async(bot, message, args) => {

    message.channel.send("Rebooting...")
  
    bot.destroy()
    bot.login(process.env.token)
  message.channel.send("Bot has been rebooted!")

      
}