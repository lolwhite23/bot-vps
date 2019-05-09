const Discord = require('discord.js');
const bot = new Discord.Client();
const { ShardingManager } = require('discord.js');
const shard = new ShardingManager('./app.js', {
  autoSpawn: true
});

shard.spawn(2);

shard.on('launch', shard => console.log(`[SHARD] Shard ${shard.id}/${shard.totalShards}`));