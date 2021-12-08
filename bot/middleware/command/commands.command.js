const bot = require("../../connection/token.connection");

module.exports = bot.command("commands", async (ctx) => {
   try {
      return ctx.setMyCommands([
      // return bot.telegram.setMyCommands([
         { command: "start", description: "Launch the bot" },
         { command: "help", description: "Bot support" },
         { command: "setting", description: "Setting up the bot" },
         { command: "reg", description: "Registration" }
      ]);
   } catch (e) {
      console.log(e);
   }
});

