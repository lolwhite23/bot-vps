const Discord = require('discord.js');
const bot = new Discord.Client();
const db2 = require('quick.db')
const fs = require('fs');
require('dotenv/config');
const moment = require('moment')

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

const Enmap = require('enmap')
bot.guildSettings = new Enmap({name: "settings"})
const defaultsettings = require('./util/defaultSettings.js')

function createserver(guildid, object){
    bot.guildSettings.ensure(guildid, object)
}
//.env file
const owner = process.env.owner;
const token = process.env.token;

//Command Handler
fs.readdir('./cmds', (err,files) => {
    if (err) {
        console.log(err);
    }

    let cmdFiles = files.filter(f => f.split(".").pop() === "js");

    if (cmdFiles.length === 0){
        console.log("No files found");
        return;
    }

    cmdFiles.forEach(f => {
        let prop = require(`./cmds/${f}`)
        bot.commands.set(prop.command.name, prop)
        if (prop.command.aliases) {
            prop.command.aliases.forEach(a => {
                bot.aliases.set(a, prop.command.name)
            })
        }
    })
    });

//Bot online
bot.on('ready', async () => {
    setInterval(async () => {

        const statuslist = [
          `Trying not to die in WWZ | Shard ${bot.shard.id+1}/${bot.shard.count}`,
          `Website coming soon! | v1.0`
        ];
        const random = Math.floor(Math.random() * statuslist.length);
        
        try {
          await bot.user.setPresence({
            game: {
              name: `${statuslist[random]}`,
              type: "PLAYING"
            },
            status: "online"
          });
        } catch (error) {
          console.error(error);
        }
        }, 10000);

        console.log(`${bot.user.username} is online, and watching ${bot.guilds.size} guilds and ${bot.users.size} users.`);
        });


bot.on('guildCreate',(guild) => {
    createserver(guild.id, defaultsettings)
})

bot.on('guildDelete',(guild) => {
    bot.guildSettings.delete(guild.id);
    bot.shard.fetchClientValues('guilds.size')
    .then(results => {
      guildschannel.setName(`🌐 Total Guilds - ${results.reduce((prev, val) => prev + val, 0)}`);
    })
    .catch(console.error);
    bot.shard.fetchClientValues('users.size')
    .then(results => {
        userschannel.setName(`👥 Total Members - ${results.reduce((prev, val) => prev +val, 0)}`)
    })
})

bot.on('guildMemberRemove', member => {
    let userschannel = bot.channels.find('id', '575053067674976256')
    bot.shard.fetchClientValues('users.size')
    .then(results => {
        userschannel.setName(`👥 Total Members - ${results.reduce((prev, val) => prev +val, 0)}`)
    })
})


bot.on('guildMemberAdd', member => {
    let userschannel = bot.channels.find('id', '575053067674976256')
    bot.shard.fetchClientValues('users.size')
    .then(results => {
        userschannel.setName(`👥 Total Members - ${results.reduce((prev, val) => prev +val, 0)}`)
    })
    let welcomeID = bot.guildSettings.get(member.guild.id, "welcomeID")
    let welcomemsg = bot.guildSettings.get(member.guild.id, "welcomemsg")
    let welcomeswitch = bot.guildSettings.get(member.guild.id, "welcome")

    let welcomeMessage = welcomemsg.replace('{user}', `<@!${member.id}>`).replace('{servername}', member.guild.name).replace('{membercount}', member.guild.memberCount)
    if(welcomeswitch !== 'true') return;

    welcomechannel = bot.channels.find('id', welcomeID)
    welcomechannel.send(welcomeMessage)

})

bot.on('guildMemberRemove', member => {
    let userschannel = bot.channels.find('id', '575053067674976256')
    bot.shard.fetchClientValues('users.size')
    .then(results => {
        userschannel.setName(`👥 Total Members - ${results.reduce((prev, val) => prev +val, 0)}`)
    })
})

bot.on('guildCreate', guild => {
    let userschannel = bot.channels.find('id', '575053067674976256')
    let guildschannel = bot.channels.find('id', '575053066332667906')
    userschannel.setName(`👥 Total Members - ${bot.users.size}`)
    bot.shard.fetchClientValues('guilds.size')
  .then(results => {
    guildschannel.setName(`🌐 Total Guilds - ${results.reduce((prev, val) => prev + val, 0)}`);
  })
  .catch(console.error);
  bot.shard.fetchClientValues('users.size')
  .then(results => {
      userschannel.setName(`👥 Total Members - ${results.reduce((prev, val) => prev +val, 0)}`)
      bot.shard.fetchClientValues('guilds.size')
      .then(results => {
        guildschannel.setName(`🌐 Total Guilds - ${results.reduce((prev, val) => prev + val, 0)}`);
      })
  })
})

bot.on('guildDelete', guild => {
    
    let userschannel = bot.channels.find('id', '575053067674976256')
    let guildschannel = bot.channels.find('id', '575053066332667906')
    userschannel.setName(`👥 Total Members - ${bot.users.size}`)
    bot.shard.fetchClientValues('guilds.size')
  .then(results => {
    guildschannel.setName(`🌐 Total Guilds - ${results.reduce((prev, val) => prev + val, 0)}`);
  })
  .catch(console.error);
  bot.shard.fetchClientValues('users.size')
  .then(results => {
      userschannel.setName(`👥 Total Members - ${results.reduce((prev, val) => prev +val, 0)}`)
      bot.shard.fetchClientValues('guilds.size')
      .then(results => {
        guildschannel.setName(`🌐 Total Guilds - ${results.reduce((prev, val) => prev + val, 0)}`);
      })
  })
})
//Message
bot.on('message',msg => {
    if(!bot.guildSettings.has(msg.guild.id)){
        createserver(msg.guild.id, defaultsettings)
    }
    let prefix = bot.guildSettings.get(msg.guild.id,"prefix")

        if (msg.channel.type === "dm") return;
        if (msg.author.bot) return;
        let msg_array = msg.content.split(" ");
        let args3 = msg.content.slice(prefix.length).trim().split(' ');
        let args = msg_array.slice(1);
        let cmd = args3.shift().toLowerCase();

        if (!msg.content.startsWith(prefix)) return;
        if (bot.commands.has(cmd)) {
            command = bot.commands.get(cmd)
        } else if (bot.aliases.has(cmd)) {
            command = bot.commands.get(bot.aliases.get(cmd))
        }
        try{
            command.run(bot,msg,args,db2,Discord,args3);
        } catch(err){
            console.log(err)
        }
        

});


//Login
bot.login(token);