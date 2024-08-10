const env = process.env;

const config = {
	bot: {
		token: env.BOT_TOKEN,
		clientId: env.CLIENT_ID,
	},
	discord: {
		guildId: env.GUILD_ID,
	},
};

module.exports = config;
