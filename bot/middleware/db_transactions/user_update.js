const UserModel = require("../../model/user.model");

module.exports = async (telegram_id, updateUserParams) => {
    await UserModel.update( updateUserParams , {
        where: {
            telegram_id:telegram_id
        }
    })
        .then((res) => {
            console.log('User updated')
        })
}