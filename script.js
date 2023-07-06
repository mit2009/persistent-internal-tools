const { App } = require("@slack/bolt");
require("dotenv").config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

(async () => {
  const port = 3030
  await app.start(process.env.PORT || port);

  const conversations = await app.client.conversations.list({
    limit: 1000,
  });
  const channels = conversations.channels.map((c) => ({
    name: c.name,
    id: c.id,
    is_archived: c.is_archived,
  }));

  for (const channel of channels) {
    // List all channels
    console.log(channel);
  }

  channels.map(async (channel) => {
    if (channel.name.split("-")[0] === "2021") {
      // Uncomment below to run these functions to (as a bot) join the channel and then archive it
      // const joinChannelResult = await app.client.conversations.join({
      //   channel: channel.id
      // });
      // const archiveResult = await app.client.conversations.archive({
      //   channel: channel.id
      // });
    }
  });

  console.log(`⚡️ Slack Bolt app is running on port ${port}!`);
})();