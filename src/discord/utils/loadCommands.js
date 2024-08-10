const path = require('path');
const fs = require('fs');

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
	console.log('Loading Application (/) commands');
	try {
		for (const folder of commandFolders) {
			const commandsPath = path.join(foldersPath, folder);
			const commandFiles = fs
				.readdirSync(commandsPath)
				.filter((file) => file.endsWith('.js'));
			for (const file of commandFiles) {
				const filePath = path.join(commandsPath, file);
				const command = require(filePath);
				if ('data' in command && 'execute' in command) {
					commands[command.scope].push(command.data.toJSON());
					client.commands.set(command.data.name, command);
					console.log('Loaded command: ', command.data.name);
				} else {
					console.warn(
						`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
					);
				}
			}
		}
		return commands;
	} catch (error) {
		console.log(error);
	}
};
