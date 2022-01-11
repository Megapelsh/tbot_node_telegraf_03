// Inline keyboard options
const inlineKeyboard = {
    reply_markup: {
        inline_keyboard: [
            [{
                text: 'YES',
                callback_data: JSON.stringify({
                    'command': 'mycommand1',
                    'answer': 'YES'
                })
            },
                {
                    text: 'NO',
                    callback_data: JSON.stringify({
                        'command': 'mycommand1',
                        'answer': 'NO'
                    })
                },
            ]
        ]
    }
};