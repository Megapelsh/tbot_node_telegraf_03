const { Markup, Scenes, Composer } = require("telegraf");
const adminMainMenu = require("../../keyboard/admin.main.kboard");
const userMainMenu = require("../../keyboard/user.main.kboard");

const startStep = new Composer();
startStep.command( "admin", async (ctx) => {
    await console.log('adminScene start')
    try {
        ctx.wizard.state.formData = {};
        // await ctx.reply("adminScene message", {
        //     reply_markup: {
        //         "inline_keyboard": [
        //             [Markup.button.callback("yes-ok", "ok")],
        //             [Markup.button.callback("changed_my_mind", "changed_my_mind")]
        //         ]
        //     }
        // });
        await ctx.reply("adminScene message", adminMainMenu);
        return ctx.wizard.next();
    } catch (e) {
        console.log(e);
    }
});

const finishStep = new Composer();
finishStep.action("addEvent", async (ctx) => {
    try {
        await ctx.answerCbQuery();
        await ctx.replyWithHTML("Have you changed your mind!");
        return ctx.scene.leave();
    } catch (e) {
        console.log(e);
    }
});
finishStep.action("chargeBalance", async (ctx) => {
    try {
        await ctx.answerCbQuery();
        await ctx.reply("ok");
        return ctx.scene.leave();
    } catch (e) {
        console.log(e);
    }
});
finishStep.action("back", async (ctx) => {
    try {
        await ctx.answerCbQuery();
        await ctx.editMessageText("Обери бажану дію", userMainMenu);
        return ctx.scene.leave();
    } catch (e) {
        console.log(e);
    }
});

module.exports = new Scenes.WizardScene("adminWizard", startStep, finishStep);
// module.exports = new Scenes.WizardScene("adminWizard", finishStep);