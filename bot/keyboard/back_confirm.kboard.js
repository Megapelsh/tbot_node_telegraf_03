const {Markup} = require("telegraf");

module.exports = {
    reply_markup: {
        "inline_keyboard": [
            [
                Markup.button.callback("Попередній крок", "back"),
                Markup.button.callback("Скасувати", "cancel"),
            ],
            [
                Markup.button.callback("Все вірно", "confirm"),
            ],
        ]
    }
}