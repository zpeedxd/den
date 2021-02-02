const Discord = require("discord.js");
const { CommandoClient } = require("discord.js-commando");
const path = require("path");
const db = require("quick.db");
const data = require("quick.db");
const fs = require("fs");
const moment = require("moment");
const http = require("http");
const ayarlar = require("./ayarlar.json");
var prefix = ayarlar.prefix;
const client = new Discord.Client();
require("./util/eventLoader")(client);
const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("AKTİF")); 
app.listen(process.env.PORT, () =>
  console.log("Port tamam." + process.env.PORT)
);

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    let perm = 2;
    ayarlar.sahip.forEach(a => {
      if (a == message.author.id) perm = 5;
    });
    return perm;
  }
  let permlvl = 0;
  if (message.member.hasPermission("CREATE_INSTANT_INVITE")) permlvl = 2;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 3;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 4;
  if (message.author.id === ayarlar.sahip) permlvl = 5;
  return permlvl;
};

/////////

client
  .login(process.env.TOKEN)
  .catch(() =>
    console.log("Token Hatalı Veya Sorunlu env kısmından kontrol et")
  );

//////////////KOMUTLAR////////////// Apex Code # Tєdoα#0001

client.on("message", async message => {
  const ms = require('parse-ms')
   let dogrulama = await db.fetch(`sahiponay_${message.author.id}_${message.guild.id}`);
    let gun = 10000000000000000000000000; 
    if (dogrulama !== null && gun - (Date.now() - dogrulama) > 0) {
       
    } else {
          if(message.author.id === ayarlar.sahip){
           db.set(`sahiponay_${message.author.id}_${message.guild.id}`, Date.now())
            message.channel.send("Hizzaya Geçin işte Benim Sahibim").then(msg => msg.delete (15000))
            }
        }
       
}); 

const emmmmbed = new Discord.MessageEmbed()
.setColor('BLACK')
.setThumbnail()
.addField(`Gizemli Bot | Teşekkürler`, `**Selamlar, Ben Gizemli Oyuncu (Gizemli Bot'nin Geliştiricisi) Öncelikle Botumuzu Eklediğiniz ve Bize Destek Olduğunuz İçin Sizlere Teşekkürlerimi Sunarım**`)
.addField(`Gizemli Bot | Prefix`, `**Gizemli Bot Botun Prefixi(ön eki) = \`${ayarlar.prefix}\`\n\n Değiştirebilmek için \`${ayarlar.prefix}prefix\` Yazabilirsiniz.**`)
.addField(`Gizemli Bot | Nasıl Kullanılır?`, `**Gizemli Bot botun tüm özelliklerinden yararlanabilmek için sadece \`${ayarlar.prefix}yardım\` yazmanız yeterlidir.**`)
.addField(`Gizemli Bot | Linkler`, `**Sohbet Kanalına a!davet Yazmanız Yeterlidir**`)
.setFooter(`Gizemli Bot | Gelişmiş Türkçe Bot | 2021`)
.setTimestamp();


client.on("guildCreate", guild => {

let defaultChannel = "";
guild.channels.cache.forEach((channel) => {
if(channel.type == "text" && defaultChannel == "") {
if(channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
defaultChannel = channel;
}
}
})

defaultChannel.send(emmmmbed)

});

client.on("guildMemberAdd", async(member) => {
  let sunucupaneli = await db.fetch(`sunucupanel_${member.guild.id}`)
  if(sunucupaneli) {
    let rekoronline = await db.fetch(`panelrekor_${member.guild.id}`)
    let toplamuye = member.guild.channels.cache.find(x =>(x.name).startsWith("Toplam Üye •"))
    let toplamaktif = member.guild.channels.cache.find(x =>(x.name).startsWith("Aktif Üye •"))
    let botlar = member.guild.channels.cache.find(x =>(x.name).startsWith("Botlar •"))
    let rekoraktif = member.guild.channels.cache.find(x =>(x.name).startsWith("Rekor Aktiflik •"))
    let songelen =  member.guild.channels.cache.find(x =>(x.name).startsWith("Son Üye • "))
   
    
    if(member.guild.members.cache.filter(off => off.presence.status !== 'offline').size > rekoronline) {
      db.set(`panelrekor_${member.guild.id}`, member.guild.members.cache.filter(off => off.presence.status !== 'offline').size)
    }
    try{
      toplamuye.setName(`Toplam Üye • ${member.guild.members.cache.size}`)
      toplamaktif.setName(`Aktif Üye • ${member.guild.members.cache.filter(off => off.presence.status !== 'offline').size}`)
      botlar.setName(`Botlar • ${member.guild.members.cache.filter(m => m.user.bot).size}`)
      rekoraktif.setName(`Rekor Aktiflik • ${rekoronline}`)
      songelen.setName(`Son Üye • ${member.user.username}`)
   } catch(e) { }
  }
})
client.on("guildMemberRemove", async(member) => {
  let sunucupaneli = await db.fetch(`sunucupanel_${member.guild.id}`)
  if(sunucupaneli) {
    let rekoronline = await db.fetch(`panelrekor_${member.guild.id}`)
    let toplamuye = member.guild.channels.cache.find(x =>(x.name).startsWith("Toplam Üye •"))
    let toplamaktif = member.guild.channels.cache.find(x =>(x.name).startsWith("Aktif Üye •"))
    let botlar = member.guild.channels.cache.find(x =>(x.name).startsWith("Botlar •"))
    let rekoraktif = member.guild.channels.cache.
    find(x =>(x.name).startsWith("Rekor Aktiflik •"))
    
    if(member.guild.members.cache.filter(off => off.presence.status !== 'offline').size > rekoronline) {
      db.set(`panelrekor_${member.guild.id}`, member.guild.members.cache.filter(off => off.presence.status !== 'offline').size)
    }
    try{
      toplamuye.setName(`Toplam Üye • ${member.guild.members.cache.size}`)
      toplamaktif.setName(`Aktif Üye • ${member.guild.members.cache.filter(off => off.presence.status !== 'offline').size}`)
      botlar.setName(`Botlar • ${member.guild.members.cache.filter(m => m.user.bot).cache.size}`)
      rekoraktif.setName(`Rekor Aktiflik • ${rekoronline}`)
    
   } catch(e) { }
  }
})