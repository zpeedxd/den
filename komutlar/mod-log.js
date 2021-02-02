const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`**Bu komutu kullanabilmek için** "\`Yönetici\`" **yetkisine sahip olmalısın.**`);

let logk = message.mentions.channels.first();
let logkanal = await db.fetch(`log_${message.guild.id}`)
  
  if (args[0] === "sıfırla" || args[0] === "kapat") {
    if(!logkanal) return message.channel.send(`**Modlog Kanalı Zaten ayarlı değil**`);
    db.delete(`log_${message.guild.id}`)
   message.channel.send(`**ModLog Kanalı başarıyla sıfırlandı.**`);
  
    return
  }
  
if (!logk) return message.channel.send(`**Bir modlog kanalı belirtmelisin.**`);

db.set(`log_${message.guild.id}`, logk.id)

message.channel.send(`**Mod-Log kanalı başarıyla ${logk} olarak ayarlandı.**`);
 message.react('607634966959882250')

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['modlog'],
    permLevel: 4,
      
}

exports.help = {
    name: 'mod-log',
    description: 'premiumal',
    usage: 'premiumal',

}