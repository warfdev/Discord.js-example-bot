var colors = require("colors")

const client = require("../../index.js");

client.once('ready', () => {

  console.log("\n[CLIENT READY] ".yellow + client.user.tag + " is ready".yellow)

})

