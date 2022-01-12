const {Markup} = require("telegraf");

module.exports = {
    reply_markup: {
        "inline_keyboard": [
            [
                Markup.button.callback("1", "1"),
                Markup.button.callback("2", "2"),
                Markup.button.callback("3", "3"),
                Markup.button.callback("4", "4"),
                Markup.button.callback("5", "5"),
                Markup.button.callback("6", "6"),
                Markup.button.callback("7", "7"),
            ],
            [
                Markup.button.callback("8", "8"),
                Markup.button.callback("9", "9"),
                Markup.button.callback("10", "10"),
                Markup.button.callback("11", "11"),
                Markup.button.callback("12", "12"),
                Markup.button.callback("13", "13"),
                Markup.button.callback("14", "14"),
            ],
            [
                Markup.button.callback("15", "15"),
                Markup.button.callback("16", "16"),
                Markup.button.callback("17", "17"),
                Markup.button.callback("18", "18"),
                Markup.button.callback("19", "19"),
                Markup.button.callback("20", "20"),
                Markup.button.callback("21", "21"),
            ],
            [
                Markup.button.callback("22", "22"),
                Markup.button.callback("23", "23"),
                Markup.button.callback("24", "24"),
                Markup.button.callback("25", "25"),
                Markup.button.callback("26", "26"),
                Markup.button.callback("27", "27"),
                Markup.button.callback("28", "28"),
            ],
            [
                Markup.button.callback("29", "29"),
                Markup.button.callback("30", "30"),
                Markup.button.callback("31", "31"),
            ],
            [
                Markup.button.callback("Попередній крок", "back"),
                Markup.button.callback("Скасувати", "cancel"),
            ],
        ]
    }
}