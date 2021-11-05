const nodelogger = require('hyperz-nodelogger');
const {
    red,
    yellow
} = require('chalk')
let i = 0;

module.exports = {
    name: 'ready',
    execute(client) {
        const logger = new nodelogger()
        logger.hypelogger(`${client.user.tag}`, '500', 'red', `Bot ${red('Online')}`, 'disabled', 'red', 'double', false)

        setTimeout(() => {
            console.log(red(`[${client.config.ogAuthor}]`) + ' Bot Online!')
            console.log(red(`[${client.config.ogAuthor}]`) + ` Logged in as ${client.user.tag} | ${client.user.id}`)
            console.log(red(`[${client.config.ogAuthor}]`) + ` Remember to join ${yellow('https://discord.gg/CAz3tNGN')}`)
        }, 200)

        changeStatus(client)

        async function changeStatus(client) {
            if (i >= client.config.presenceConfig.length) i = 0;
            await client.user.setPresence({
                activities: [{
                    name: client.config.presenceConfig[i].name,
                    type: client.config.presenceConfig[i].type
                }],
                status: client.config.presenceConfig[i].status
            });
            i++;
            setTimeout(() => {
                changeStatus(client);
            }, 10000)
        }

    }
}