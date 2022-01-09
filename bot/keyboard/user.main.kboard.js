const {Markup} = require("telegraf");


// inline keyboard

// module.exports = {
//     reply_markup: {
//         "inline_keyboard": [
//             [
//                 Markup.button.callback("Показати мій QR-код", "mycode"),
//             ],
//             [
//                 Markup.button.callback("Показати мій баланс", "mybalance"),
//                 Markup.button.callback("Розклад заходів", "calendar"),
//             ]
//         ]
//     }
// }


// simple keyboard

module.exports = Markup.keyboard([
    ['Мій QR-код', 'Мій баланс'],
]).resize()