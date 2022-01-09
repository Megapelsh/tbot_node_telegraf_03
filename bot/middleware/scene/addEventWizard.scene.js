const { Markup, Scenes, Composer } = require("telegraf");
const adminMainMenu = require("../../keyboard/admin.main.kboard");
const userMainMenu = require("../../keyboard/user.main.kboard");
const monthMenu = require("../../keyboard/month.kboard")

const startStep = new Composer();
startStep.action( "addEvent", async (ctx) => {
    await console.log('addEventScene start')
    try {
        ctx.wizard.state.formData = {};
        await ctx.reply("Введи назву заходу:", Markup.removeKeyboard());
        return ctx.wizard.next();
    } catch (e) {
        console.log(e);
    }
});

const nameStep = new Composer();
nameStep.on('text', async (ctx) => {
    try {
        ctx.wizard.state.formData.eventName = ctx.message;
        await ctx.reply('Month', monthMenu);
        // return ctx.wizard.next();
        return ctx.scene.leave();
    }
    catch (e) {
        console.log(e);
    }
})

const startDateStep = new Composer();
startDateStep.on('text', async (ctx) => {
    try {
        ctx.wizard.state.formData.eventStarts = ctx.message;
        return ctx.wizard.next();
    }
    catch (e) {
        console.log(e);
    }
})

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
// finishStep.action("back", async (ctx) => {
//     try {
//         await ctx.answerCbQuery();
//         await ctx.editMessageText("Обери бажану дію", userMainMenu);
//         return ctx.scene.leave();
//     } catch (e) {
//         console.log(e);
//     }
// });

// module.exports = new Scenes.WizardScene("adminWizard", startStep, nameStep, startDateStep, placeStep, priceStep, speakerStep, finishStep);
module.exports = new Scenes.WizardScene("addEventWizard", startStep, nameStep);
