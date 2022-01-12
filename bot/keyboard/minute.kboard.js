const {Markup} = require("telegraf");

module.exports = {
    reply_markup: {
        "inline_keyboard": [
            [
                Markup.button.callback("00", "00"),
                Markup.button.callback("05", "05"),
                Markup.button.callback("10", "10"),
                Markup.button.callback("15", "15"),
                Markup.button.callback("20", "20"),
                Markup.button.callback("25", "25"),
            ],
            [
                Markup.button.callback("30", "30"),
                Markup.button.callback("35", "35"),
                Markup.button.callback("40", "40"),
                Markup.button.callback("45", "45"),
                Markup.button.callback("50", "50"),
                Markup.button.callback("55", "55"),
            ],
            [
                Markup.button.callback("Попередній крок", "back"),
                Markup.button.callback("Скасувати", "cancel"),
            ],
        ]
    }
}