const {Markup} = require("telegraf");

module.exports = {
    reply_markup: {
        "inline_keyboard": [
            [
                Markup.button.callback("Січень", "січня"),
                Markup.button.callback("Лютий", "лютого"),
                Markup.button.callback("Березень", "березня"),
                Markup.button.callback("Квітень", "квітня"),
            ],
            [
                Markup.button.callback("Травень", "травня"),
                Markup.button.callback("Червень", "червня"),
                Markup.button.callback("Липень", "липня"),
                Markup.button.callback("Серпень", "серпня"),
            ],
            [
                Markup.button.callback("Вересень", "вересня"),
                Markup.button.callback("Жовтень", "жовтня"),
                Markup.button.callback("Листопад", "листопада"),
                Markup.button.callback("Грудень", "грудня"),
            ],
            [
                Markup.button.callback("Попередній крок", "back"),
                Markup.button.callback("Скасувати", "cancel"),
            ],
        ]
    }
}