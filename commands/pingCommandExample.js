const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'ping',
    execute(message) {
        const d = new MessageEmbed()
            .setDescription(`<@${message.author.id}>, I am online!`)
            .setColor('RANDOM')
            .setFooter(`Bot Base V13 | https://discord.gg/tKy4tqyc3y | HarleyDev`)

        message.channel.send({
            embeds: [d]
        })

        message.delete().catch(e => {
            console.log(e)
        });
    }
}