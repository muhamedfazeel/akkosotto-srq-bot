const env = process.env;

const config = {
  bot: {
    token: env.BOT_TOKEN,
    clientId: env.CLIENT_ID,
  },
  discord: {
    guildId: env.GUILD_ID,
    channel: {
      welcome: env.WELCOME_CHANNEL_ID,
      rules: env.RULES_CHANNEL_ID,
      announce: env.ANNOUNCEMENT_CHANNEL_ID,
    },
    roles: {
      srqArmy: env.SRQ_ARMY_ROLE_ID,
    },
  },
};

module.exports = config;
