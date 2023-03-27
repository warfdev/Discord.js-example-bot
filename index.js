const { Client, Message, MessageEmbed, Collection } = require("discord.js");
const fs= require("fs");
const { PREFIX, TOKEN } = require("./config.json")
var colors = require("colors")
const SimplDB = require("simpl.db")
const db = new SimplDB();


const client = new Client({
  intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES"]
})



// handler
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./Commands");
client.events = new Collection()
client.config = require("./config.json")

module.exports = client;

["Command", "Event"].forEach(handler => {
  require(`./Structures/${handler}`)(client);
});

client.on('messageCreate', async message => {
  if(message.author.bot) return;
  if(!message.content.startsWith(PREFIX)) return;
  if(!message.guild) return;
  if(!message.member) message.member = await message.guild.fetchMember(message);
  const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if(cmd.length == 0) return;
  let command = client.commands.get(cmd)
  if(!command) command = client.commands.get(client.aliases.get(cmd));
  
  
  if(command) {
    //OWNER ONLY
    if(command.ownerOnly) {
      if(!client.config.OWNERID.includes(message.author.id)) {
        message.channel.send(`${message.member} bu komutu yalnızca yapımcım kullanabilir.`)
        return;
      }
    } 
}

  if(command) command.run(client, message, args)
})

process.on('unhandledRejection', err => {
  console.log(`[ERROR] İşlenmemiş promise reddi: ${err.message}.`);
  console.log(err);
});








client.login(TOKEN)