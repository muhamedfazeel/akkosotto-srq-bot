const { Events } = require('discord.js');
const CustomLogger = require('../../shared/logger');

const logger = new CustomLogger('Ready [EVENT]');

module.exports = {
	name: Events.ClientReady,
	label: 'On Ready',
	once: true,
	execute(client) {
		logger.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
