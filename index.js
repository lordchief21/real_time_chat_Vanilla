const http = require('http')
const express = require('express')
const {WebSocket} = require('ws');


const port = 9000;
const app = express();
const server = http.createServer(app)

// Declare and initialize the WebSocket instance
const wss = new WebSocket.Server({server,concurrencyLimit: 10});

wss.on("connection",(ws)=>{
    
    ws.on("message", (msj, isBinary) =>{
        wss.clients.forEach((client) => {
            if ( client != ws && client.readyState == WebSocket.OPEN) {
                client.send(msj, {binary: isBinary});
            }
        })
        console.log("received: ", msj)
    })
    
})



server.listen(port, ()=> {
    console.log(`Server is running on http://localhost:${port}`)
})




 