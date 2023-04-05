# giveaway komutu
- `./Commands/` klasörüne atın

- **kod;**
```js
const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "çekiliş",
  aliases: ["gw", "giveaway", "cekilis"],
  run: async (client, message, args) => {
    const checkMemberPerms = message.member.permissions.has("ADMINISTATOR");
    const checkBotPerms = message.guild.me.permissions.has("ADMINISTATOR");
    if(!checkMemberPerms) return message.reply(`Bu komutu kullanabilmen için "ADMIN" yetkisine ihtiyacın var.`)
    if(!checkBotPerms) return message.reply(`"ADMIN" yetkim yok.`)
    
    
    if(!args[0]) {
      return message.reply("bir zaman belirtin. `1s - 1m - 1h -1d`")
    }
    if (!args[1]) {
      return message.reply('Bir ödül belirtmelisiniz!');
    }
    
    let time = args[0];
    if(time.endsWith("s")){
      time = parseInt(time) * 1000;
    } else if(time.endsWith("m")){
      time = parseInt(time) * 60 * 1000;
    } else if(time.endsWith("h")){
      time = parseInt(time) * 60 * 60 * 1000;
    } else if(time.endsWith("d")){
      time = parseInt(time) * 24 * 60 * 60 * 1000;
    } else {
      return message.reply("Hatalı zaman belirttiniz.Örnek kullanım: `!gw 1d nirro çekilişi.`")
    }
    let timeReplace = args[0].replace('s', ' saniye').replace('m', ' dakika').replace('h', ' saat').replace('d', ' gün')
    
    
    
    const gw = new MessageEmbed()
    .setTitle(":tada: Çekiliş :tada:")
    .setColor("RED")
    .addFields(
      {
        name: "Çekilişi Başlatan",
        value: `${message.author.username}`
      },
      {
        name: "Çekiliş Ödülü",
        value: `${args.slice(1).join(" ")}`
      }
    )
    .setDescription(`****Çekiliş Süresi:**** ${timeReplace}\nÇekilişe katılmak için :tada: tepkisine tıklayın.`)
    .setTimestamp()
    const gwMessage = await message.channel.send({ embeds: [gw] })
    await gwMessage.react('🎉');
    
    
    //timer
    setTimeout(async () => {
      const userReact = (await gwMessage.reactions.cache.get('🎉').users.fetch()).filter(user => !user.bot).random();
      
      if(userReact){
        const winnerMsg = new MessageEmbed()
        .setColor("GREEN")
        .setTitle(":tada: Çekiliş :tada:")
        .setDescription(`Tebrikler ${userReact}! \`${args.slice(1).join(" ")}\` çekilişini kazandınız!`)
        .setTimestamp()
        await gwMessage.edit({ embeds: [winnerMsg] })
        await gwMessage.reactions.cache.get('🎉').remove()
        await gwMessage.reply({ content: `:tada: **ÇEKİLİŞ SONUCU** :tada:\nTebrikler ${userReact}! \`${args.slice(1).join(" ")}\` Çekilişinin kazananı sen oldun!` })
      } else {
        const gwErr = new MessageEmbed()
        .setColor("YELLOW")
        .setTitle(":tada: Çekiliş :tada:")
        .setDescription("Çekilişe kimse katılmadı veya bilinmeyen bir hata meydana geldi.")
        .setTimestamp()
        await gwMessage.edit({ embeds: [gwErr] })
        await gwMessage.reactions.cache.get('🎉').remove()
      }
    }, time)
    
    
    
    
  }
}
```
