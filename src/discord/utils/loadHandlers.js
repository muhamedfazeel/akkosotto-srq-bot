const path = require('path');
const fs = require('fs');
const CustomLogger = require('../../../shared/logger');

const logger = new CustomLogger('LoadHandler');

const handlersPath = path.join(__dirname, '../handlers');
const handlerFiles = fs
	.readdirSync(handlersPath)
	.filter((file) => file.endsWith('.js'));

/**
 * Method to register client events
 * @param {*} client
 */
module.exports.loadHandlers = (client) => {
	for (const file of handlerFiles) {
		const filePath = path.join(handlersPath, file);
		const handler = require(filePath);
		if (handler.name && handler.execute) {
			client.on(handler.name, (...args) => handler.execute(...args, client));
		} else {
			logger.error(
				`The handler at ${filePath} is missing a required "name" or "execute" property.`
					.red
			);
		}
	}
};
