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
    </head>
    <body>
        Назва заходу:<br> ${event} 
        <br><br>
        Вхід: <br>${access}
    </body>
    </html>
    
    `;
    response.end(data);
}).listen(8090);