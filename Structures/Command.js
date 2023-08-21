const { readdirSync } = require('fs');
var colors = require("colors")
const { OWNERID } =require("../config.json")
const ascii = require('ascii-table');
let table = new ascii("Command Handler");
table.setHeading('COMMANDS', ' LOAD STATUS');
module.exports = (client) => {
    readdirSync('./Commands/').forEach(dir => {
        const commands = readdirSync(`./Commands/${dir}`).filter(file => file.endsWith('.js'));
        for(let file of commands) {
            let pull = require(`../Commands/${dir}/${file}`);
            if(pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(file, 'COMMAND LOADED')
            } else {
                table.addRow(file, 'FAILED TO LOAD COMMAND')
                continue;
            } if(pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name))
        }
    });
    console.log(table.toString());
}
