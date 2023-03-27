module.exports = {
  name: "ping",
  aliases: ["latency", "ms"],
  run: async (client, message) => {
    message.reply(`pong! ${client.ws.ping}`)
  }
}
