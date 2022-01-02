const bot = require("../../connection/token.connection");
const {Markup} = require("telegraf");

module.exports = bot.command("admin", async (ctx) => {
    await ctx.scene.enter("adminWizard");
})