const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

module.exports = client => {
var oyun = [
        "Prefixim a!",
        "a!yardım Tüm Komutlarımı Gösterir",
        "Beni Kodlayan Gizemli Oyuncu",
        "Yakında Daha Çok Komut Eklenicek",
        "Şuanlık Destek Sunucum Yok Ama En Yakın Zamanda Yapılıcak",
        ""

    ];

    setInterval(function() {

        var random = Math.floor(Math.random()*(oyun.length-0+1)+0);

        client.user.setActivity(oyun[random], "https://www.youtube.com/channel/UCf86Qrlwi4xpfmMW_vg9l6w" );
      }, 2 * 5000); //DEĞİŞME SÜRESİ
  
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Aktif, Komutlar yüklendi!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: ${client.user.username} ismi ile giriş yapıldı!`);
  client.user.setStatus("online");
  client.user.setActivity(`${prefix}yardım | Şu an ${client.channels.cache.size} adet kanala, ${client.guilds.cache.size} sunucuya ve ${client.users.cache.size} kullanıcıya hizmet veriliyor!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Oyun ismi ayarlandı!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Şu an ${client.channels.cache.size} adet kanala, ${client.guilds.cache.size} sunucuya ve ${client.users.cache.size} kullanıcıya hizmet veriliyor!`);


};