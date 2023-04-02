# tempban komutu.
- `./Commands/` klasörüne atın.

- **kod;**
```js
const { MessageEmbed } = require("discord.js")
const { PREFIX } = require("../../config.json")

module.exports = {
  name: "tempban",
  aliases: ["süreliban", "tb"],
  userPermission: "BAN_MEMBERS",
  clientPermission: "BAN_MEMBERS",
  run: async (client, message, args) => {
    const member = message.mentions.members.first()
    const reason = args.slice(2).join(' ') || "sebep girilmedi."
    
    if(!member) return message.reply(`lütfen bir kullanıcı etiketeyin. \`${PREFIX}tempban @kullanıcı 1h hakaret.\``)
    if(!args[1]) return message.reply(`süre girmediniz.`)
    
    
    let time = args[1];
    if(time.endsWith("s")){
      time = parseInt(time) * 1000;
    } else if(time.endsWith("m")) {
      time = parseInt(time) * 60 * 1000;
    } else if(time.endsWith("h")) {
      time = parseInt(time) * 60 * 60 * 1000;
    } else if(time.endsWith("d")) {
      time = parseInt(time) * 24 * 60 * 60 * 1000;
    }
    let timeReplace = args[1].replace("s", " saniye").replace("m", " dakika").replace("h", " saat").replace("d", " gün")
    
    const tempban = await member.ban({ reason: reason })
    
    const banned = new MessageEmbed()
    .setTitle("Süreli Yasaklama İşlemi")
    .addFields(
      {
        name: "Yasaklanan Kullanıcı",
        value: `${member.user.tag} | ${member.id}`
      },
      {
        name: "Yasaklanma Sebebi",
        value: `${reason}`
      }
    )
    .setFooter(`Yasaklama Süresi: ${timeReplace}`)
    .setTimestamp()
    .setColor("RED")
    const msg = await message.channel.send({ embeds: [banned] })
    
    
    setTimeout(async () => {
      message.guild.bans.fetch().then(async bans => {
        const getuser = bans.find(ban => ban.user.id === member.id)
        await message.guild.members.unban(getuser.user)
        
        const unbanned = new MessageEmbed()
        .setTitle("Süreli Yasaklama İşlemi")
        .setDescription(`\`${member.user.tag}\` yasağı kalktı.`)
        .setColor("GREEN")
        .setTimestamp()
        await msg.edit({ embeds: [unbanned] })
      })
    }, time)
    
  }
}
```
