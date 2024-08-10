const {
	Client,
	GatewayIntentBits,
	REST,
	Collection,
	Routes,
} = require('discord.js');
const config = require('./config/configuration');
const {
	registerClientEvents,
} = require('./discord/utils/registerClientEvents');
const { loadCommands } = require('./discord/utils/loadCommands');
const { COMMAND_SCOPE } = require('./shared/constants');

const client = new Client({
	intents: [GatewayIntentBits.Guilds],
});
const rest = new REST({ version: '10' }).setToken(config.bot.token);

client.commands = new Collection();

console.log('Registering Events');
registerClientEvents(client);

console.log('Loading Commands');
const commands = loadCommands(client);

console.log('Registering the loaded commands');
(async () => {
	try {
		console.log(
			`Started registering ${
				commands[COMMAND_SCOPE.APPLICATION].length +
				commands[COMMAND_SCOPE.GUILD].length
			} commands.`
		);

		const guild = await rest.put(
			Routes.applicationGuildCommands(
				config.bot.clientId,
				config.discord.guildId
			),
			{ body: commands[COMMAND_SCOPE.GUILD] }
		);
		console.log(`Successfully registered ${guild.length} Guild (/) commands.`);
		const application = await rest.put(
			Routes.applicationCommands(config.bot.clientId),
			{ body: commands[COMMAND_SCOPE.APPLICATION] }
		);
		console.log(
			`Successfully registered ${application.length} Application (/) commands.`
		);
	} catch (error) {
		console.error(error);
	}
})();

module.exports = { client };
