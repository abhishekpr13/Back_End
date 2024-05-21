const fs = require('fs')
const http = require('http');
const url = require('url');



const server = http.createServer((req,res)=>{
    const pathName = req.url;

    if(pathName ==='/'|| pathName === '/overview'){
        res.end('This is the Overview');
    } else if (pathName === '/product'){
        res.end('This is the Product');
    } else if(pathName === '/api'){
        res.writeHead(200,{ 'Content-type': 'application/json'});
        res.end(data);
    } else{
        res.writeHead(404,{
            'Content-type': 'text/html'

        });
        res.end('<h1>Page not found</h1>')
    }
   
});

server.listen(8000,'127.0.0.1',()=>{
    console.log('listening to request on port 8000');
});