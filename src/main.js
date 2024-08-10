const { Client, GatewayIntentBits, Events } = require('discord.js');

const client = new Client({
	intents: [GatewayIntentBits.Guilds],
});

client.once(Events.ClientReady, (instance) => {
	console.log(`Logged in as ${instance.user.tag}`);
});

module.exports = { client };
