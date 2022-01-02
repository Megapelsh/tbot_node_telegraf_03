const http = require('http');
const url = require('url');
http.createServer((request, response) => {
    console.log('server work');
    let urlRequest = url.parse(request.url, true);
    let event = urlRequest.query.event ? urlRequest.query.event : '***';
    let access = 'Заборонено!'
    if (urlRequest.query.access == 'granted') {
        access = 'Дозволено';
    }


    data = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <link rel="stylesheet" href="style.css">
        <style>
            html {
                box-sizing: border-box;
                height: 100%;
                font-size: 14pt;
                font-family: sans-serif;
                line-height: 1.5em;
            }

            body {
                background: #202020;
                color: #aaa;
                height: 95%;
            }
            
            .wrapper {
                display: flex;
                flex-direction: column;
                min-height: 100%;
            }

            .main {
                flex: 1 1 auto;
                margin: 30px;
            }
            
            input {
                display: block;
                width: 80%;
                margin: 30px auto;
                font-size: 1em;
                height: 2em;
                color: #333;
                border: none;
                border-radius: 4px;
            }

            input:first-child {
                background: #00ff4c;
            }

            input:last-child {
                background: #cfcc00;
            }
        </style>
    </head>
    <body>
        <div class="wrapper">
            <div class="main">
                <div>
                    Назва заходу:<br> ${event} 
                </div>
                <div>
                    Вхід: <br>${access}
                </div>
            </div>
            <div class="inputs">
                <input type="submit" value="Сплата готівкою">
                <input type="submit" value="Відвідувач вийшов з заходу">
            </div>
            
        </div>
    </body>
    </html>
    
    `;
    response.end(data);
}).listen(8090);