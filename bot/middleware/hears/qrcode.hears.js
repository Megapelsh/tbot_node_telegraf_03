const bot = require("../../connection/token.connection");
const UserModel = require("../../model/user.model");
const getQRpic = require("../../function/getQRpic.func");

module.exports = bot.hears("Мій QR-код", async (ctx) => {
    try {
        const foundUser = await UserModel.findOne({where:{telegram_id:ctx.chat.id}});
        if (!foundUser) {
            await ctx.reply('Для користування ботом треба зареєструватись. Введи \/start')
        }
        else {
            await getQRpic(ctx, foundUser.qrcode);
        }
    }
    catch (e) {
        console.log(e);
    }
});