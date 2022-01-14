const { Scenes, Composer } = require("telegraf");
const EventModel = require("../../model/event.model");
const db = require("../../connection/db.connection");

const userMainMenu = require("../../keyboard/user.main.kboard");
const monthMenu = require("../../keyboard/month.kboard")
const yearMenu = require("../../keyboard/year.kboard")
const dateMenu = require("../../keyboard/date.kboard")
const hourMenu = require("../../keyboard/hour.kboard")
const minuteMenu = require("../../keyboard/minute.kboard")
const backMenu = require("../../keyboard/back_cancel.kboard")
const backConfirmMenu = require("../../keyboard/back_confirm.kboard")


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

const dateStep = new Composer();
dateStep.on('text', async (ctx) => {
    try {
        ctx.wizard.state.formData.eventAuthor = ctx.message.chat.id;
        ctx.wizard.state.formData.eventName = ctx.message.text;
        ctx.wizard.state.formData.event =
            'Назва заходу: ' + ctx.wizard.state.formData.eventName + '\n';
        await ctx.reply(`${ctx.wizard.state.formData.event}\nОбери число проведеня заходу:`, dateMenu);
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
        await ctx.answerCbQuery();
        ctx.wizard.state.formData.eventDate = ctx.update.callback_query.data;
        ctx.wizard.state.formData.event =
            'Назва заходу: ' + ctx.wizard.state.formData.eventName + '\n' +
            'Дата проведення заходу: ' + ctx.wizard.state.formData.eventDate + '\n';
        await ctx.editMessageText(`${ctx.wizard.state.formData.event}\nОбери місяць, в якому буде проведено захід:`, monthMenu);
        return ctx.wizard.next();
    }
    catch (e) {
        console.log(e);
    }
});

const yearStep = new Composer();
yearStep.action('back', async ctx => {
    await ctx.answerCbQuery();
    await ctx.editMessageText(`${ctx.wizard.state.formData.event}\nОбери число проведення заходу:`, dateMenu);
    ctx.wizard.selectStep(2)
});
yearStep.action('cancel', async ctx => {
    await ctx.answerCbQuery();
    ctx.reply('Додавання заходу скасовано', userMainMenu);
    ctx.reply('Обери бажану дію');
    return ctx.scene.leave();
})
yearStep.on('callback_query', async (ctx) => {
    try {
        ctx.wizard.state.formData.eventMonth = ctx.update.callback_query.data;
        ctx.wizard.state.formData.event =
            'Назва заходу: ' + ctx.wizard.state.formData.eventName + '\n' +
            'Дата проведення заходу: ' + ctx.wizard.state.formData.eventDate + '.' +
            ctx.wizard.state.formData.eventMonth + '\n';
        await ctx.editMessageText(`${ctx.wizard.state.formData.event}\nОбери рік проведення заходу:`, yearMenu);
        return ctx.wizard.next();
    }
    catch (e) {
        console.log(e);
    }
});

const hourStep = new Composer();
hourStep.action('back', async ctx => {
    await ctx.answerCbQuery();
    await ctx.editMessageText(`${ctx.wizard.state.formData.event}\nОбери місяць проведення заходу:`, monthMenu);
    ctx.wizard.selectStep(3)
});
hourStep.action('cancel', async ctx => {
    await ctx.answerCbQuery();
    ctx.reply('Додавання заходу скасовано', userMainMenu);
    ctx.reply('Обери бажану дію');
    return ctx.scene.leave();
})
hourStep.on('callback_query', async (ctx) => {
    try {
        ctx.wizard.state.formData.eventYear = ctx.update.callback_query.data;
        ctx.wizard.state.formData.event =
            'Назва заходу: ' + ctx.wizard.state.formData.eventName + '\n' +
            'Дата проведення заходу: ' + ctx.wizard.state.formData.eventDate + '.' +
            ctx.wizard.state.formData.eventMonth + '.' +
            ctx.wizard.state.formData.eventYear + '\n';
        await ctx.editMessageText(`${ctx.wizard.state.formData.event}\nОбери годину початку заходу:`, hourMenu);
        return ctx.wizard.next();
    }
    catch (e) {
        console.log(e);
    }
});

const minuteStep = new Composer();
minuteStep.action('back', async ctx => {
    await ctx.answerCbQuery();
    await ctx.editMessageText(`${ctx.wizard.state.formData.event}\nОбери рік проведення заходу:`, yearMenu);
    ctx.wizard.selectStep(4)
});
minuteStep.action('cancel', async ctx => {
    await ctx.answerCbQuery();
    ctx.reply('Додавання заходу скасовано', userMainMenu);
    ctx.reply('Обери бажану дію');
    return ctx.scene.leave();
})
minuteStep.on('callback_query', async (ctx) => {
    try {
        ctx.wizard.state.formData.eventHour = ctx.update.callback_query.data;
        ctx.wizard.state.formData.event =
            'Назва заходу: ' + ctx.wizard.state.formData.eventName + '\n' +
            'Дата проведення заходу: ' + ctx.wizard.state.formData.eventDate + '.' +
            ctx.wizard.state.formData.eventMonth + '.' +
            ctx.wizard.state.formData.eventYear + '\n' +
            'Час початку: ' + ctx.wizard.state.formData.eventHour + ' годин' + '\n';
        await ctx.editMessageText(`${ctx.wizard.state.formData.event}\nОбери хвилину початку заходу:`, minuteMenu);
        return ctx.wizard.next();
    }
    catch (e) {
        console.log(e);
    }
});

const placeStep = new Composer();
placeStep.action('back', async ctx => {
    await ctx.answerCbQuery();
    await ctx.editMessageText(`${ctx.wizard.state.formData.event}\nОбери годину початку заходу:`, hourMenu);
    ctx.wizard.selectStep(5)
});
placeStep.action('cancel', async ctx => {
    await ctx.answerCbQuery();
    ctx.reply('Додавання заходу скасовано', userMainMenu);
    ctx.reply('Обери бажану дію');
    return ctx.scene.leave();
})
placeStep.on('callback_query', async (ctx) => {
    try {
        ctx.wizard.state.formData.eventMinute = ctx.update.callback_query.data;
        ctx.wizard.state.formData.event =
            'Назва заходу: ' + ctx.wizard.state.formData.eventName + '\n' +
            'Дата проведення заходу: ' + ctx.wizard.state.formData.eventDate + '.' +
            ctx.wizard.state.formData.eventMonth + '.' +
            ctx.wizard.state.formData.eventYear + '\n' +
            'Час початку: ' + ctx.wizard.state.formData.eventHour + ':' +
            ctx.wizard.state.formData.eventMinute + '\n';
        await ctx.editMessageText(`${ctx.wizard.state.formData.event}\nВведи місце проведення заходу:`, backMenu);
        return ctx.wizard.next();
    }
    catch (e) {
        console.log(e);
    }
});

const priceStep = new Composer();
priceStep.action('back', async ctx => {
    await console.log('back pressed');
    await ctx.answerCbQuery();
    await ctx.editMessageText(`${ctx.wizard.state.formData.event}\nОбери хвилину початку заходу:`, minuteMenu);
    ctx.wizard.selectStep(6)
});
priceStep.action('cancel', async ctx => {
    await ctx.answerCbQuery();
    ctx.reply('Додавання заходу скасовано', userMainMenu);
    ctx.reply('Обери бажану дію');
    return ctx.scene.leave();
})
priceStep.on('text', async (ctx) => {
    try {
        ctx.wizard.state.formData.eventPlace = ctx.message.text;
        ctx.wizard.state.formData.event =
            'Назва заходу: ' + ctx.wizard.state.formData.eventName + '\n' +
            'Дата проведення заходу: ' + ctx.wizard.state.formData.eventDate + '.' +
            ctx.wizard.state.formData.eventMonth + '.' +
            ctx.wizard.state.formData.eventYear + '\n' +
            'Час початку: ' + ctx.wizard.state.formData.eventHour + ':' +
            ctx.wizard.state.formData.eventMinute + '\n' +
            'Місце проведення: ' + ctx.wizard.state.formData.eventPlace + '\n';
        await ctx.reply(`${ctx.wizard.state.formData.event}\nВведи вартість відвідування заходу (тільки цифри):`, backMenu);
        return ctx.wizard.next();
    }
    catch (e) {
        console.log(e);
    }
});

const speakerStep = new Composer();
speakerStep.action('back', async ctx => {
    await ctx.answerCbQuery();
    await ctx.editMessageText(`${ctx.wizard.state.formData.event}\nВведи місце проведення заходу:`, backMenu);
    ctx.wizard.selectStep(7)
});
speakerStep.action('cancel', async ctx => {
    await ctx.answerCbQuery();
    ctx.reply('Додавання заходу скасовано', userMainMenu);
    ctx.reply('Обери бажану дію');
    return ctx.scene.leave();
})
speakerStep.on('text', async (ctx) => {
    try {
        ctx.wizard.state.formData.eventPrice = parseInt(ctx.message.text.replace(/ /g, ''), 10);
        ctx.wizard.state.formData.event =
            'Назва заходу: ' + ctx.wizard.state.formData.eventName + '\n' +
            'Дата проведення заходу: ' + ctx.wizard.state.formData.eventDate + '.' +
            ctx.wizard.state.formData.eventMonth + '.' +
            ctx.wizard.state.formData.eventYear + '\n' +
            'Час початку: ' + ctx.wizard.state.formData.eventHour + ':' +
            ctx.wizard.state.formData.eventMinute + '\n' +
            'Місце проведення: ' + ctx.wizard.state.formData.eventPlace + '\n' +
            'Вартість відвідування: ' + ctx.wizard.state.formData.eventPrice + ' грн.\n';
        await ctx.reply(`${ctx.wizard.state.formData.event}\nНазви спікера:`, backMenu);
        return ctx.wizard.next();
    }
    catch (e) {
        console.log(e);
    }
});

const verifyStep = new Composer();
verifyStep.action('back', async ctx => {
    await ctx.answerCbQuery();
    await ctx.editMessageText(`${ctx.wizard.state.formData.event}\nВведи вартість відвідування заходу (тільки цифри):`, backMenu);
    ctx.wizard.selectStep(8)
});
verifyStep.action('cancel', async ctx => {
    await ctx.answerCbQuery();
    ctx.reply('Додавання заходу скасовано', userMainMenu);
    ctx.reply('Обери бажану дію');
    return ctx.scene.leave();
})
verifyStep.on('text', async (ctx) => {
    try {
        ctx.wizard.state.formData.eventSpeaker = ctx.message.text;
        ctx.wizard.state.formData.event =
            'Назва заходу: ' + ctx.wizard.state.formData.eventName + '\n' +
            'Дата проведення заходу: ' + ctx.wizard.state.formData.eventDate + '.' +
            ctx.wizard.state.formData.eventMonth + '.' +
            ctx.wizard.state.formData.eventYear + '\n' +
            'Час початку: ' + ctx.wizard.state.formData.eventHour + ':' +
            ctx.wizard.state.formData.eventMinute + '\n' +
            'Місце проведення: ' + ctx.wizard.state.formData.eventPlace + '\n' +
            'Вартість відвідування: ' + ctx.wizard.state.formData.eventPrice + ' грн.\n' +
            'Спікер: ' + ctx.wizard.state.formData.eventSpeaker + '\n';
        await ctx.reply(`${ctx.wizard.state.formData.event}\nВсе правильно?`, backConfirmMenu);
        return ctx.wizard.next();
    }
    catch (e) {
        console.log(e);
    }
});

const finishStep = new Composer();
finishStep.action('back', async ctx => {
    await ctx.answerCbQuery();
    await ctx.editMessageText(`${ctx.wizard.state.formData.event}\nНазви спікера:`, backMenu);
    ctx.wizard.selectStep(9)
});
finishStep.action('cancel', async ctx => {
    await ctx.answerCbQuery();
    ctx.reply('Додавання заходу скасовано', userMainMenu);
    ctx.reply('Обери бажану дію');
    return ctx.scene.leave();
})
finishStep.on("text", async (ctx) => {
    try {
        ctx.wizard.state.formData.eventSpeaker = ctx.message.text;
        ctx.wizard.state.formData.event =
            'Назва заходу: ' + ctx.wizard.state.formData.eventName + '\n' +
            'Дата проведення заходу: ' + ctx.wizard.state.formData.eventDate + '.' +
            ctx.wizard.state.formData.eventMonth + '.' +
            ctx.wizard.state.formData.eventYear + '\n' +
            'Час початку: ' + ctx.wizard.state.formData.eventHour + ':' +
            ctx.wizard.state.formData.eventMinute + '\n' +
            'Місце проведення: ' + ctx.wizard.state.formData.eventPlace + '\n' +
            'Вартість відвідування: ' + ctx.wizard.state.formData.eventPrice + ' грн.\n' +
            'Спікер: ' + ctx.wizard.state.formData.eventSpeaker + '\n';
        await ctx.reply(`${ctx.wizard.state.formData.event}\nВітаю! Захід створено.`, userMainMenu);
        await console.log(ctx.wizard.state.formData.event);
        return ctx.scene.leave();
    } catch (e) {
        console.log(e);
    }
});
finishStep.action("confirm", async (ctx) => {
    try {
        await ctx.answerCbQuery();
        ctx.wizard.state.formData.eventStarts = ctx.wizard.state.formData.eventYear + '-' +
            ctx.wizard.state.formData.eventMonth + '-' +
            ctx.wizard.state.formData.eventDate + ' ' +
            ctx.wizard.state.formData.eventHour + ':' +
            ctx.wizard.state.formData.eventMinute;

        await db.sync();
        await EventModel.create({
            name: ctx.wizard.state.formData.eventName,
            starts: ctx.wizard.state.formData.eventStarts,
            place: ctx.wizard.state.formData.eventPlace,
            price: ctx.wizard.state.formData.eventPrice,
            speaker: ctx.wizard.state.formData.eventSpeaker,
            author: ctx.wizard.state.formData.eventAuthor,
        });

        await ctx.reply(`Вітаю! Захід\n${ctx.wizard.state.formData.eventName}\nстворено.`, userMainMenu);
        return ctx.scene.leave();
    } catch (e) {
        console.log(e);
    }
});

module.exports = new Scenes.WizardScene("addEventWizard", startStep, dateStep, monthStep, yearStep, hourStep, minuteStep, placeStep, priceStep, speakerStep, verifyStep, finishStep);