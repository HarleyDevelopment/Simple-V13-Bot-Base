const _config = {
    botToken: '',
    botPrefix: '!',
    ogAuthor: 'HarleyDev', // You don't have to leave this here, but would be nice if you do! <3



    // Presence Config \\ 
    presenceConfig: [{
        name: "HarleyDevelopment",
        type: "PLAYING",
        status: "dnd"
    }, {
        name: "This server",
        type: "WATCHING",
        status: "dnd"
    }, {
        name: "To fortnite loading screen!",
        type: "LISTENING",
        status: "dnd"
    }],

    // Event Handler \\ 
    useEventHandler: true
}

module.exports = _config;

/*
For this to work, you'd need to enable all of the intents on the Discord Developers portal. (discord.com/developers)
You'd also need to have node.js installed
You'd also need to install the packages using the INSTALL.BAT

To use the config throughout your code use the following example: 

client.config.(variable)
Eg. client.config.botToken


## Made By Harley (https://discord.gg/TnxJkFqeVu)
If you're going to remove official credits, please leave credits per release or on bot somewhere.
*/