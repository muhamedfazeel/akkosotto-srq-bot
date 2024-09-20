const path = require('path');
const fs = require('fs');
const CustomLogger = require('../../shared/logger');

const logger = new CustomLogger('Reload');

const foldersPath = path.join(__dirname, '../commands');
const commandFolders = fs.readdirSync(foldersPath);

/**
 * Method to load the commands defined
 * @param {Object} client - The Discord client instance.
 * @returns {Array} An Oject of loaded commands data arrays.
 */
module.exports.loadCommands = (client) => {
	const commands = {
		APPLICATION: [],
		GUILD: [],
	};
	logger.log('Loading Application (/) commands');
	try {
		for (const folder of commandFolders) {
			const commandsPath = path.join(foldersPath, folder);
			const commandFiles = fs
				.readdirSync(commandsPath)
				.filter((file) => file.endsWith('.js'));
			for (const file of commandFiles) {
				const filePath = path.join(commandsPath, file);
				const command = require(filePath);
				if (command.command === false) continue;
				if (command.data && command.execute) {
					commands[command.scope].push(command.data.toJSON());
					client.commands.set(command.data.name, command);
					logger.log('Loaded command: ', command.data.name);
				} else {
					logger.error(
						`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
							.red
					);
				}
			}
		}
		return commands;
	} catch (error) {
		logger.log(error);
	}
};
