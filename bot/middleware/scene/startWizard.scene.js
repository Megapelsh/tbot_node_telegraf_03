const { Markup, Scenes, Composer } = require("telegraf");
const UserModel = require("../../model/user.model");
const db = require("../../connection/db.connection");
const fetch = require("node-fetch");
require('dotenv').config();


const startStep = new Composer();
startStep.start( async (ctx) => {
    try {
        await db.sync();

        ctx.wizard.state.formData = {};
        ctx.wizard.state.formData.startPayload = ctx.startPayload;

        const foundUser = await UserModel.findOne({where:{telegram_id:ctx.chat.id}});

        if (!foundUser) {
            await ctx.reply('Для початку давй познайомимось. Я - бот. Допомагаю своїм користувачам відвідувати цікаві заходи. Для того, щоб приєднатися до нашої спільноти, тобі потрібно зареєструватися. Натисни кнопку "Відправити номер телефону" у нижній частині екрану.', Markup.keyboard([
                [
                    {
                        text: "Відправити номер телефону",
                        request_contact: true
                    }
                ]
            ]).oneTime().resize());
            // *** add user to DB
            // await UserModel.create({
            //     username: ctx.chat.username,
            //     telegram_id: ctx.chat.id,
            //     first_name: ctx.chat.first_name,
            //     last_name: ctx.chat.last_name,
            //     balance: 0,
            //     startPayload: ctx.startPayload,
            // });
            // await console.log('User added to DB')
        }

        return ctx.wizard.next();
    } catch (e) {
        console.log(e);
    }
});

const registerUser = new Composer();
registerUser.on("contact", async (ctx) => {
    try {
        const receivedPhoneNum = ctx.message.contact.phone_number;
        const phoneNum = receivedPhoneNum.replace(/[^0-9]/g, '');
        // ctx.wizard.state.formData.phone = ctx.message.contact.phone_number;
        // await ctx.replyWithHTML("I have your phone number!");

        let url = `https://multicode.eu/mapi.php?f=McCode_Add&out=json&dt[userID]=23&dt[url]=${phoneNum}&dt[name]=${phoneNum}&`;
        let username = process.env.MULTICODE_LOGIN;
        let password = process.env.MULTICODE_PASSWORD;
        let qrCode = {};
        await fetch(url, {
            method:'GET',
            headers: {
                'Authorization': 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64')
            }})
            .then(response => response.json())
            .then(json => {
                qrCode = json;
            })
            .catch(await function () {
                console.log('fetch error');
            })

        url = `https://multicode.eu/mapi.php?f=McCode_Activate&out=json&dt[qrID]=${qrCode.ID}&dt[activate]=Y`;
        await fetch(url, {
            method:'GET',
            headers: {
                'Authorization': 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64')
            }})
            .then(response => response.json())
            .then(json => {
                console.log(json);
            })
            .catch(await function () {
                console.log('fetch error');
            })

        let urlGetQR =`https://multicode.eu/qrCode/?f=p&data=https://dsqr.eu/?q=${qrCode.QR}`;
        await fetch(urlGetQR)
            .then(response => {
                ctx.reply('Твій код:');
                ctx.replyWithPhoto(response);
                console.log('pic sent');
            })
            .catch(await function () {
                console.log('fetch error');
            })


        return ctx.scene.leave();
    } catch (e) {
        console.log(e);
    }
});

const finishStep = new Composer();
finishStep.on("contact", async (ctx) => {
    try {
        // const receivedPhoneNum = ctx.message.contact.phone_number;
        // const phoneNum = receivedPhoneNum.replace(/[^0-9]/g, '');
        // ctx.wizard.state.formData.phone = ctx.message.contact.phone_number;
        // await ctx.replyWithHTML("I have your phone number!");

        return ctx.scene.leave();
    } catch (e) {
        console.log(e);
    }
});
finishStep.action("ok", async (ctx) => {
    try {
        // await ctx.answerCbQuery();
        await ctx.reply("ok");
        return ctx.scene.leave();
    } catch (e) {
        console.log(e);
    }
});

module.exports = new Scenes.WizardScene("startWizard", startStep, registerUser, finishStep);