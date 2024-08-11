const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChannelType,
} = require("discord.js");
const { COMMAND_SCOPE } = require("../../../shared/constants");

module.exports = {
    category: "information",
    scope: COMMAND_SCOPE.APPLICATION,
    label: "Rules",
  data: new SlashCommandBuilder()
    .setName("rules")
    .setDescription("Display the server rules")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel to send the rules")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    ),

  async execute(interaction) {
    const targetChannel = interaction.options.getChannel("channel");

    const rulesEmbed = new EmbedBuilder()
      .setTitle("Server Rules")
      .setColor("#00AE86")
      .setDescription(
        "Please adhere to the following rules to ensure a positive experience for everyone:"
      )
      .addFields(
        {
          name: "1. Respectful Conduct",
          value:
            "Racism, abuse, profanity, and NSFW content are strictly prohibited.",
        },
        {
          name: "2. Mutual Respect",
          value: "Treat all members with humility and kindness.",
        },
        {
          name: "3. Authenticity Required",
          value: "Impersonation or use of a fake identity is not allowed.",
        },
        {
          name: "4. Zero Tolerance for Harmful Behavior",
          value:
            "Harsh jokes about suicide, political or toxic comments, excessive personal attacks, or any form of serious harassment (including blackmail, hate speech, or spamming) will result in a permanent ban.",
        },
        {
          name: "5. Privacy Protection",
          value:
            "Do not share personal or private information such as your address, full name, documents, contact number, photos, or social media accounts. Your safety is your responsibility, and we are not liable for any consequences.",
        },
        {
          name: "6. Avoid Controversy",
          value:
            "Refrain from making disparaging or controversial comments about other YouTubers, streamers, or servers.",
        },
        {
          name: "7. Channel Usage",
          value:
            "Use each channel for its designated purpose. Off-topic activities are not permitted.",
        },
        { name: "8. Role Requests", value: "Do not solicit or beg for roles." },
        {
          name: "9. No Threats",
          value: "Threats to hack or harm others are strictly forbidden.",
        },
        {
          name: "10. Impersonation of Staff",
          value:
            "Impersonating staff, moderators, or leaders is taken very seriously and will not be tolerated, even as a joke.",
        },
        {
          name: "11. No Spamming",
          value:
            "Refrain from spamming emojis, repeating messages, or engaging in spam for the purpose of increasing your level.",
        },
        {
          name: "12. Topic Management",
          value:
            "If a staff member requests a change in conversation topic due to its offensive nature, please comply. Failure to do so may result in a kick or ban.",
        },
        {
          name: "13. Welcoming Environment",
          value:
            "We encourage our long-standing members to welcome newcomers and include them in conversations. Please do not be unkind or dismissive towards new members who may be unfamiliar with server norms.",
        },
        {
          name: "14. Respect for Staff",
          value:
            "Show respect to all staff and adhere to their instructions. Do not use abusive or inappropriate names or profile pictures. Staff members reserve the right to change your name if deemed necessary.",
        }
      )
      .setFooter({
        text: "Thank you for following the rules and contributing to a positive community!",
      });

    await targetChannel.send({ embeds: [rulesEmbed] });
    await interaction.reply({
      content: "Server rules have been posted.",
      ephemeral: true,
    });
  },
};
