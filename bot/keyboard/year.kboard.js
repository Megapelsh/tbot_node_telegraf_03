const {Markup} = require("telegraf");

module.exports = {
    reply_markup: {
        "inline_keyboard": [
            [
                Markup.button.callback("2022", "2022"),
                Markup.button.callback("2023", "2023"),
                Markup.button.callback("2024", "2024"),
                Markup.button.callback("2025", "2025"),
            ],
            [
                Markup.button.callback("Попередній крок", "back"),
                Markup.button.callback("Скасувати", "cancel"),
            ],
        ]
    }
}