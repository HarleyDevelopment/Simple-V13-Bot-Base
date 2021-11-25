const Discord = require('discord.js');
const client = new Discord.Client({
    intents: ['GUILDS', 'GUILD_MESSAGES', "GUILD_MESSAGE_REACTIONS", "DIRECT_MESSAGES", "GUILD_MEMBERS", "GUILD_BANS", "GUILD_INTEGRATIONS", "GUILD_WEBHOOKS", "GUILD_INVITES", "GUILD_VOICE_STATES", "GUILD_PRESENCES", "GUILD_MESSAGE_TYPING", "DIRECT_MESSAGE_REACTIONS", "DIRECT_MESSAGE_TYPING"],
    partials: ["CHANNEL", "MESSAGE", "REACTIONS"],
    allowedMentions: {
        parse: ['users', 'roles', 'everyone'],
        repliedUser: true
    }
}); // Requires all of the intents on discord.com/developers
client.config = require('./config.js');
const token = client.config.botToken;
const prefix = client.config.botPrefix;
const mysql = require('mysql');
let useSQL = true;
let con;
const fs = require('fs');
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

// Collections
client.commands = new Discord.Collection();

// More code. 
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

if (client.config.useEventHandler) {
    for (const file of eventFiles) {
        const event = require(`./events/${file}`);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client, Discord));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client, Discord));
        }
    }
}

if(client.config.useMySQLDatabase){
    const stuff = {
    connectionLimit: 10,
    queueLimit: 5000,
    host: client.config.DBhost,
    user: client.config.DBuser,
    password: client.config.DBpassword,
    database: client.config.DBdatabase,
}
con = mysql.createPool(stuff)
setTimeout(() => {
    console.log('MySQL Successfully Connected!')
}, 4000);
con.on('enqueue', function() {
    if (client.config.debugmode) {
        console.log(`${chalk.red('[SQL SERVER]:')} Waiting for available connection slot`);
    }
});
con.on('release', function(connection) {
    if (client.config.debugmode) {
        console.log(`${chalk.red('[SQL SERVER]:')} Connection %d released`, connection.threadId);
    }
});
}

client.on('messageCreate', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd)

    if (command) {
        command.execute(message, args, client, Discord);
    }
});




client.login(token);
