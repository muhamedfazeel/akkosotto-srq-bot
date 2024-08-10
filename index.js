const { client } = require('./src/main');
const config = require('./src/config/configuration');

client.login(config.bot.token);
