const { SlashCommandBuilder } = require('discord.js');
const { COMMAND_SCOPE } = require('../../../shared/constants');

module.exports = {
	category: 'fun',
	scope: COMMAND_SCOPE.APPLICATION,
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply({ content: 'Pong!', ephemeral: true });
	},
};
