const bot = require("../../connection/token.connection");
const {Markup} = require("telegraf");

module.exports = bot.command("admin", async (ctx) => {
    await ctx.reply("oneMessage", {
        reply_markup: {
            "inline_keyboard": [
                [Markup.button.callback("yes-ok", "ok")],
                [Markup.button.callback("changed_my_mind", "changed_my_mind")]
            ]
        }
    });

    await ctx.scene.enter("adminWizard");
})