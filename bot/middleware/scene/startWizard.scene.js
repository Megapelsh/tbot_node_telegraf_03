const { Markup, Scenes, Composer } = require("telegraf");
const UserModel = require("../../model/user.model");
const db = require("../../connection/db.connection");
const fetch = require("node-fetch");
const {json} = require("sequelize");
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
            return ctx.wizard.next();
        }

        ctx.wizard.state.formData.qrcode = foundUser.qrcode;
        ctx.wizard.state.formData.qrcodeID = foundUser.qrcodeID;
        return ctx.wizard.selectStep(2);
    } catch (e) {
        console.log(e);
    }
});

const registerUser = new Composer();
registerUser.on("contact", async (ctx) => {
    try {
        const receivedPhoneNum = ctx.message.contact.phone_number;
        const phoneNum = receivedPhoneNum.replace(/[^0-9]/g, '');
        const event = ctx.wizard.state.formData.startPayload ? ctx.wizard.state.formData.startPayload : '***';

        let targetUrl = `http://docmyjournal.zorind.com?event=${event}`
        let url = `https://multicode.eu/mapi.php?f=McCode_Add&out=json&dt[userID]=23&dt[url]=${targetUrl}&dt[name]=${phoneNum}&`;
        let username = process.env.MULTICODE_LOGIN;
        let password = process.env.MULTICODE_PASSWORD;
        let userID = process.env.MULTICODE_USERID;
        let qrCode = {};
        await fetch(url, {
            method:'GET',
            headers: {
                'Authorization': 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64')
            }})
            .then(response => response.json())
            .then(json => {
                qrCode = json;
                console.log(qrCode);
            })
            .catch(async function (e) {
                await console.log('!!! create QRcode fetch error');
                await console.log('**********');
                await console.log(e);
                await console.log('**********');
                await ctx.reply('Упс... Щось пішло не так. Спробуй трохи пізніше');
                await ctx.scene.leave();
            })

        ctx.wizard.state.formData.qrcodeID = qrCode.ID;

        url = `https://multicode.eu/mapi.php?f=McCode_Activate&out=json&dt[qrID]=${qrCode.ID}&dt[userID]=${userID}&dt[activate]=Y`;
        await fetch(url, {
            method:'GET',
            headers: {
                'Authorization': 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64')
            }})
            .then(response => {
                // console.log(response);
                return response.json();
            })
            .then(response => console.log(`QRcode activation status ${response.activate}`))

            .catch(async function (e) {
                await console.log('!!! activate QRcode fetch error');
                await console.log(e);
                await console.log('---------------');
            })


        // *** add user to DB
        await UserModel.create({
            username: ctx.chat.username,
            telegram_id: ctx.chat.id,
            first_name: ctx.chat.first_name,
            last_name: ctx.chat.last_name,
            phone: phoneNum,
            balance: 0,
            qrcode: qrCode.QR,
            qrcodeID: ctx.wizard.state.formData.qrcodeID,
            startPayload: ctx.wizard.state.formData.startPayload,
        });
        await console.log('User added to DB')


        let urlGetQR =`https://multicode.eu/qrCode/?f=p&data=https://dsqr.eu/?q=${qrCode.QR}`;
        await fetch(urlGetQR)
            .then(response => {
                ctx.reply('Твій код:');
                ctx.replyWithPhoto(response);
                console.log('pic sent');
            })
            .catch(async function (e) {
                await console.log('!!! get QRcode pic fetch error');
                await console.log(e);
                await console.log('---------------');
            })


        return ctx.wizard.next();
    }
    catch (e) {
        console.log(e);
    }
});

const finishStep = new Composer();
// finishStep.on("contact", async (ctx) => {
//     try {
//         // const receivedPhoneNum = ctx.message.contact.phone_number;
//         // const phoneNum = receivedPhoneNum.replace(/[^0-9]/g, '');
//         // ctx.wizard.state.formData.phone = ctx.message.contact.phone_number;
//         // await ctx.replyWithHTML("I have your phone number!");
//
//         return ctx.scene.leave();
//     } catch (e) {
//         console.log(e);
//     }
// });
finishStep.hears("ok", async (ctx) => {
    try {
        let targetUrl = `http://docmyjournal.zorind.com?event=${ctx.wizard.state.formData.startPayload}`;
        let url = `https://multicode.eu/mapi.php?f=McCode_Update&out=json&dt[userID]=23&dt[qrID]=${ctx.wizard.state.formData.qrcodeID}&dt[url]=${targetUrl}`;
        let username = process.env.MULTICODE_LOGIN;
        let password = process.env.MULTICODE_PASSWORD;
        await fetch(url, {
            method:'GET',
            headers: {
                'Authorization': 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64')
            }})
            .then(response => console.log(`*** Update Qrcode status: ${response.status}`))
            .catch(await function () {
                console.log('!!! update QRcode fetch error');
            })




        // await ctx.answerCbQuery();
        await ctx.reply("ok");
        return ctx.scene.leave();
    } catch (e) {
        console.log(e);
    }
});

module.exports = new Scenes.WizardScene("startWizard", startStep, registerUser, finishStep);