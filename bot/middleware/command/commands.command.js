const bot = require("../../connection/token.connection");

module.exports = bot.command("commands", async (ctx) => {
   try {
      return ctx.setMyCommands([
         { command: "start", description: "Launch the bot" },
         { command: "help", description: "Bot support" },
         { command: "setting", description: "Setting up the bot" },
         { command: "regis", description: "Registration" },
         { command: "admin", description: "Admin functions" },
      ]);
   } catch (e) {
      console.log(e);
   }
});



// module.exports = bot.telegram.setMyCommands([
//    { command: "start", description: "Launch the bot" },
//    { command: "help", description: "Bot support" },
//    { command: "settings", description: "Setting up the bot" },
//    { command: "regi", description: "Registration" },
//    { command: "admin", description: "Admin functions" },
// ]);
