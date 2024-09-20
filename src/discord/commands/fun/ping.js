const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const config = require('../../../config/configuration');
const { formatUptime } = require('../../../shared/functions/formatUptime');
const { COMMAND_SCOPE } = require('../../../shared/constants');
const CustomLogger = require('../../../shared/logger');

const logger = new CustomLogger('Say [COMMAND]');

module.exports = {
	category: 'fun',
	command: true,
	scope: COMMAND_SCOPE.APPLICATION,
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		try {
			const client = interaction.client;
			const ping = client.ws.ping;
			const uptime = formatUptime(client.uptime);
			const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024;
			const numServers = client.guilds.cache.size;
			const numUsers = client.users.cache.size;
			const apiLatency = client.ws.ping;
			const discordJSVersion = require('discord.js').version;
			const nodeVersion = process.version;
			const version = require('../../../../package.json').version;
			const embedcolor = parseInt(config.colors.primary.replace('#', ''), 16);

			const pingEmbed = new EmbedBuilder()
				.setColor(embedcolor)
				.setAuthor({
					name: `${client.user.username} Stats`,
					iconURL: client.user.avatarURL(),
				})
				.addFields(
					{ name: ':ping_pong: Ping', value: `┕ ${ping} ms`, inline: true },
					{ name: ':clock1: Uptime', value: '┕ ' + uptime, inline: true },
					{
						name: ':file_cabinet: Memory',
						value: `┕ ${Math.round(memoryUsage * 100) / 100} MB`,
						inline: true,
					},
					{ name: ':desktop: Servers', value: `┕ ${numServers}`, inline: true },
					{
						name: ':busts_in_silhouette: Users',
						value: `┕ ${numUsers}`,
						inline: true,
					},
					{
						name: ':satellite: API Latency',
						value: `┕ ${apiLatency} ms`,
						inline: true,
					},
					{ name: ':robot: Version', value: `┕ v${version}`, inline: true },
					{
						name: ':blue_book: Discord.js',
						value: `┕ v${discordJSVersion}`,
						inline: true,
					},
					{
						name: ':green_book: Node.js',
						value: `┕ ${nodeVersion}`,
						inline: true,
					}
				)
				.setTimestamp()
				.setFooter({
					text: `Requested by ${interaction.user.username}`,
					iconURL: interaction.user.avatarURL(),
				});

			await interaction.reply({ embeds: [pingEmbed], ephemeral: true });
		} catch (error) {
			logger.error(error);
		}
	},
};
