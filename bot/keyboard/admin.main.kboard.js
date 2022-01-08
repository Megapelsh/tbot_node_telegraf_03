const {Markup} = require("telegraf");

module.exports = {
    reply_markup: {
        "inline_keyboard": [
            [
                Markup.button.callback("Додати захід", "addEvent"),
                Markup.button.callback("Поповнити баланс клієнту", "chargeBalance"),
            ],
            // [
            //     Markup.button.callback("<<", "back"),
            // ]
        ]
    }
}