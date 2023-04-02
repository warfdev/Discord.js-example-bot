# rps komutu
- `./Commands/` klasörüne atın.

- **kod;**
```js
const { MessageEmbed } = require("discord.js")


// emojis
const rockEmoji = '🪨';
const paperEmoji = '📰';
const scissorsEmoji = '✂️';

// oynamak için
function rps(playerSelection){
  const botSelection = ["taş", "kağıt", "makas"][Math.floor(Math.random() * 3)];
  
  
  var eMap = {
    "taş": rockEmoji,
    "kağıt": paperEmoji,
    "makas": scissorsEmoji
  }
  
  
  
  
  //RESULT
  let resultMessage = "";
  let eColor = ""; 
  if(playerSelection === botSelection){
    resultMessage = "berabere."
    eColor = "YELLOW"
  } else if(
    (playerSelection === "taş" && botSelection === "makas") ||
    (playerSelection === "kağıt" && botSelection === "taş") ||
    (playerSelection === "makas" && botSelection === "kağıt")
  ){
    resultMessage = "kazandın."
    eColor = "GREEN"
  } else {
    resultMessage = "kaybettin."
    eColor = "RED"
  }
  //
  
  
  const replyMessage = new MessageEmbed()
  .setTitle("Taş, Kağıt, Makas")
  .addFields(
    {
      name: "Sizin Seçiminiz",
      value: `${eMap[playerSelection]}`
    },
    {
      name: "Benim Seçimim",
      value: `${eMap[botSelection]}`
    }
  )
  .setDescription(`Sonuç: ${resultMessage}`)
  .setColor(eColor)
  return replyMessage;
  
  
  
}


/**
 * KULLANIM
 *  !rps <taş / kağıt / makas>
 */
module.exports = {
  name: "tkm",
  aliases: ["rps", "taskagitmakas"],
  run: async (client, message, args) => {
    const select = args[0];
    if(!args[0]) return message.reply(`lütfen \`taş\`, \`kağıt\` veya \`makas\` yazın.`)
    
    if(select !== "taş" && select !== "makas" && select !== "kağıt") return;
    
    const replyMessage = rps(select)
    message.channel.send({ embeds: [replyMessage] })
    
    
    
  }
}
```
