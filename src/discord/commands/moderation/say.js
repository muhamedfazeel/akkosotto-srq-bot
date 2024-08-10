const {
	SlashCommandBuilder,
	ChannelType,
	EmbedBuilder,
} = require('discord.js');
const { COMMAND_SCOPE } = require('../../../shared/constants');

module.exports = {
	category: 'moderation',
	scope: COMMAND_SCOPE.APPLICATION,
	data: new SlashCommandBuilder()
		.setName('say')
		.setDescription('Replies with your input!')
		.addStringOption((option) =>
			option
				.setName('input')
				.setDescription('The input to send back')
				.setRequired(true)
		)
		.addChannelOption((option) =>
			option
				.setName('channel')
				.setDescription('The channel to send to')
				.addChannelTypes(ChannelType.GuildText)
		),
	async execute(interaction) {
		const message = interaction.options.getString('input', true);
		const channel =
			interaction.options.getChannel('channel') || interaction.channel;

		try {
			await channel.send(message);
			await interaction.reply({ content: 'Message sent!', ephemeral: true });
		} catch (error) {
			console.error('Error sending message:', error);
			await interaction.reply({
				content: 'There was an error sending the message.',
				ephemeral: true,
			});
		}
	},
};
