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
const CustomLogger = require('./shared/logger');

const client = new Client({
	intents: [GatewayIntentBits.Guilds],
});
const rest = new REST({ version: '10' }).setToken(config.bot.token);

client.commands = new Collection();

const logger = new CustomLogger('Main');

logger.log('Registering Events');
registerClientEvents(client);

logger.log('Loading Commands');
const commands = loadCommands(client);

logger.log('Registering the loaded commands');
(async () => {
	try {
		logger.log(
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
		logger.log(`Successfully registered ${guild.length} Guild (/) commands.`);
		const application = await rest.put(
			Routes.applicationCommands(config.bot.clientId),
			{ body: commands[COMMAND_SCOPE.APPLICATION] }
		);
		logger.log(
			`Successfully registered ${application.length} Application (/) commands.`
		);
	} catch (error) {
		logger.error(error);
	}
})();

// Add error handling
client.on('error', (error) =>
	logger.error(`Client Error: ${error.message}`.red)
);
client.on('unhandledRejection', (error) =>
	logger.error('Unhandled promise rejection:', error)
);
client.on('warn', (warning) =>
	logger.warn(`Client Warning: ${warning}`.yellow)
);

module.exports = { client };
