const fetch = require("node-fetch");
const {Markup} = require("telegraf");
const bot = require("../connection/token.connection");
const userMainMenu = require("../keyboard/user.main.kboard");

module.exports = async function (ctx, qrcode) {
    let urlGetQR =`https://multicode.eu/qrCode/?f=p&data=https://dsqr.eu/?q=${qrcode}`;
    await fetch(urlGetQR)
        .then(response => {
            // ctx.reply('Твій код:', Markup.removeKeyboard());
            ctx.replyWithPhoto(response, userMainMenu.resize());
            console.log('pic sent');
        })
        .catch(async function (e) {
            await console.log('!!! get QRcode pic fetch error');
            await console.log(e);
            await console.log('---------------');
        })
}