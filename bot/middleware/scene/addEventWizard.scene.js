const { Markup, Scenes, Composer } = require("telegraf");
const adminMainMenu = require("../../keyboard/admin.main.kboard");
const userMainMenu = require("../../keyboard/user.main.kboard");
const monthMenu = require("../../keyboard/month.kboard")
const yearMenu = require("../../keyboard/year.kboard")

const startStep = new Composer();
startStep.action( "addEvent", async (ctx) => {
    await console.log('addEventScene start')
    try {
        ctx.wizard.state.formData = {};
        await ctx.reply("Введи назву заходу:");
        return ctx.wizard.next();
    } catch (e) {
        console.log(e);
    }
});

const yearStep = new Composer();
yearStep.on('text', async (ctx) => {
    try {
        ctx.wizard.state.formData.eventName = ctx.message.text;
        ctx.wizard.state.formData.event = `Назва заходу: ${ctx.wizard.state.formData.eventName}\n`
        await ctx.reply(`${ctx.wizard.state.formData.event}\nОбери рік, в якому буде проведено захід:`, yearMenu);
        return ctx.wizard.next();
    }
    catch (e) {
        console.log(e);
    }
});

const monthStep = new Composer();
monthStep.action('back', async ctx => {
    await ctx.answerCbQuery();
    ctx.reply('Введи назву заходу:');
    ctx.wizard.selectStep(1)
});
monthStep.action('cancel', async ctx => {
    await ctx.answerCbQuery();
    ctx.reply('Додавання заходу скасовано', userMainMenu);
    ctx.reply('Обери бажану дію');
    return ctx.scene.leave();
})
monthStep.on('callback_query', async (ctx) => {
    try {
        // await console.log(callbackQuery.message);
        // await console.log(callbackQuery.data);
        await console.log(ctx.update.callback_query.data);

        // ctx.wizard.state.formData.eventName = ctx.message.text;
        // ctx.wizard.state.formData.event = `Назва заходу: ${ctx.wizard.state.formData.eventName}\n`
        // await ctx.reply(`${ctx.wizard.state.formData.event}\nОбери місяць, в якому буде проведено захід:`, monthMenu);
        // return ctx.wizard.next();
        return ctx.scene.leave();
    }
    catch (e) {
        console.log(e);
    }
});

const dateStep = new Composer();
dateStep.action('back', async ctx => ctx.wizard.back());
dateStep.action('cancel', async ctx => {
    ctx.reply('Додавання заходу скасовано', userMainMenu);
    ctx.reply('Обери бажану дію');
    return ctx.scene.leave();
})
dateStep.action('лютого', async (ctx) => {
    try {
        ctx.wizard.state.formData.eventMonth = ctx.message;
        await console.log(ctx.wizard.state.formData.eventMonth);
        // return ctx.wizard.next();
        return ctx.scene.leave();
    }
    catch (e) {
        console.log(e);
    }
});




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

// module.exports = new Scenes.WizardScene("addEventWizard", startStep, yearStep, monthStep, dateStep, hourStep, minuteStep, placeStep, priceStep, speakerStep, finishStep);
module.exports = new Scenes.WizardScene("addEventWizard", startStep, yearStep, monthStep, dateStep);
