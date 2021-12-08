const { Markup } = require("telegraf");
const bot = require("../../connection/token.connection");

module.exports = bot.help(async (ctx) => {
   try {
      return ctx.reply("How can I help you?")
   }
   catch (e) {
      console.log(e)
   }

})
