const http = require('http')
const express = require('express')
const {WebSocket} = require('ws');


const port = 9000;
const app = express();
const server = http.createServer(app)

// Declare and initialize the WebSocket instance
const wss = new WebSocket.Server({server});

wss.on("connection",(ws)=>{
    
    ws.on("message", (msj) =>{
        ws.send(`Hello you sent: ${msj} ` )
        console.log("received: ", msj)
    })
    ws.send('Hi there, I am WebSocket server')
})



server.listen(port, ()=> {
    console.log(`Server is running on http://localhost:${port}`)
})




 