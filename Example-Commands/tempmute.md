## tempmute komutu.
- `./Commands/` klasörüne atın.

* **NOT:**

\- Bir kullanıcıyı susturmak için `muted` veya `Muted` isimli bir rol arar.Eğer rol yoksa susturma işlemi yapmaz.

\- Sunucunuzda `muted` isimli susturma rolü yok ise, rol oluşturun ve gerekli yetkileri ayarlayın.

- **Kod;**
```js
const { MessageEmbed } = require("discord.js")


module.exports = {
  name: "mute",
  aliases: ["tempmute", "sustur", "temp-mute"],
  run: async (client, message, args) => {
    checkMemberPerms = message.member.permissions.has("ADMINISTATOR")
    checkClientPerms = message.guild.me.permissions.has("ADMINISTATOR")
    
    if(!checkMemberPerms) return message.reply(`Yetkiniz yetersiz`)
    if(!checkClientPerms) return message.reply(`Yetkim yetersiz`)
    
    const findRole = message.guild.roles.cache.find(r => r.name == "muted" || r.name == "Muted")
    if(!findRole) return message.reply("`muted` rolü sunucuda yok.")
    
    const mentioned = message.mentions.members.first()
    if(!mentioned) return message.reply(`lütfen bir kullanıcı etiketleyin.`)
    if(!args[1]) return message.reply(`lütfen zaman girin.`)
    
    let time = args[1];
    if(time.endsWith("s")){
      time = parseInt(time) * 1000;
    } else if(time.endsWith("m")){
      time = parseInt(time) * 60 * 1000;
    } else if(time.endsWith("h")){
      time = parseInt(time) * 60 * 60 * 1000;
    } else if(time.endsWith("d")){
      time = parseInt(time) * 24 * 60 * 60 * 1000;
    } else {
      return message.reply("Hatalı zaman belirttiniz.Örnek kullanım: `!mute @kullanıcı 1h`")
    }
    let timeReplace = args[1].replace('s', ' saniye').replace('m', ' dakika').replace('h', ' saat').replace('d', ' gün')
    
    
    const verildi = await mentioned.roles.add(findRole.id)
    const addrole = new MessageEmbed()
    .setTitle("Susturma işlemi")
    .setDescription(`${message.member}, \`${mentioned.user.tag}\` isimli üyeyi \`${timeReplace}\` susturdu.`)
    message.channel.send({ embeds: [addrole] })
    
    setTimeout(async () => {
      await verildi.roles.remove(findRole.id)
      message.channel.send(`<@${mentioned.id}>, susturulman kalktı.`)
    }, time)
  }
  
}
```
