const {Markup} = require("telegraf");

module.exports = {
    reply_markup: {
        "inline_keyboard": [
            [
                Markup.button.callback("Січень", "01"),
                Markup.button.callback("Лютий", "02"),
                Markup.button.callback("Березень", "03"),
                Markup.button.callback("Квітень", "04"),
            ],
            [
                Markup.button.callback("Травень", "05"),
                Markup.button.callback("Червень", "06"),
                Markup.button.callback("Липень", "07"),
                Markup.button.callback("Серпень", "08"),
            ],
            [
                Markup.button.callback("Вересень", "09"),
                Markup.button.callback("Жовтень", "10"),
                Markup.button.callback("Листопад", "11"),
                Markup.button.callback("Грудень", "12"),
            ],
            [
                Markup.button.callback("Попередній крок", "back"),
                Markup.button.callback("Скасувати", "cancel"),
            ],
        ]
    }
}