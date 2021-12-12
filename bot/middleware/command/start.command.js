const { Markup } = require("telegraf");
const bot = require("../../connection/token.connection");
const db = require("../../connection/db.connection");
const UserModel = require("../../model/user.model");

const updateUser = require("../db_transactions/user_update");

module.exports = bot.start(async (ctx) => {
   try {
      await db.sync();

      const telegram_id = ctx.chat.id;
      const username = ctx.chat.username;
      const first_name = ctx.chat.first_name;
      const last_name = ctx.chat.last_name;
      const startPayload = ctx.startPayload;

      const foundUser = await UserModel.findOne({where:{telegram_id:ctx.chat.id}});

      if (foundUser && startPayload) {
         const updateUserParams = {};
         updateUserParams.startPayload = startPayload;
         await updateUser(telegram_id, updateUserParams);
      }

      if (!foundUser) {
         await UserModel.create({
            username: username,
            telegram_id: telegram_id,
            first_name: first_name,
            last_name: last_name,
            balance: 0,
            startPayload: startPayload,
         });
         await console.log('User added to DB')
      }


      return ctx.replyWithHTML(`Hi, <b>${first_name}</b>!`);
   } catch (e) {
      console.log(e);
   }
});