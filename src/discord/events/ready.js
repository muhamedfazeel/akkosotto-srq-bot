const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	label: 'On Ready',
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
