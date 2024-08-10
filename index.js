const { client } = require('./src/main');
const config = require('./src/config/config');

client.login(config.bot.token);
