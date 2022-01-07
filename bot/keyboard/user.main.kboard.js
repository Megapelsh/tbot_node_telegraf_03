const {Markup} = require("telegraf");

module.exports = {
    reply_markup: {
        "inline_keyboard": [
            [
                Markup.button.callback("Показати мій QR-код", "mycode"),
            ],
            [
                Markup.button.callback("Показати мій баланс", "mybalance"),
                Markup.button.callback("Розклад заходів", "calendar"),
            ]
        ]
    }
}