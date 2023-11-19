const http = require('http')
const express = require('express')
const {WebSocket} = require('ws');
const  bodyParser = require('body-parser');
const { constants } = require('fs/promises');


const port = 9000;
const app = express();
const server = http.createServer(app);

let userdata = "";

// Declare and initialize the WebSocket instance
const wss = new WebSocket.Server({server, perMessageDeflate: {
    zlibDeflateOptions: {
      // See zlib defaults.
      chunkSize: 1024,
      memLevel: 7,
      level: 3
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024
    },
    // Other options settable:
    clientNoContextTakeover: true, // Defaults to negotiated value.
    serverNoContextTakeover: true, // Defaults to negotiated value.
    serverMaxWindowBits: 10, // Defaults to negotiated value.
    // Below options specified as default values.
    concurrencyLimit: 10, // Limits zlib concurrency for perf.
    threshold: 1024 // Size (in bytes) below which messages
    // should not be compressed if context takeover is disabled.
    }
});

//Declare new function to generate unique ID per user

wss.getUniqueId = () => {
    const genId = () => {
        return Math.floor((1+Math.random()) * 0x10000).toString(8).substring(1)
    }
    return genId() + genId() - genId()
}


//Open  WebSocket connection and send or received message from/to client.

wss.on('connection', (ws,req)=>{
    ws.id = req.headers['sec-websocket-key']
    ws.on("message", (msj, isBinary) =>{
        wss.clients.forEach((client) => {
            if ( client != ws && client.readyState == WebSocket.OPEN) {
                client.send(msj, {binary: isBinary});
                    console.log(
                        {   id: client.id,
                            username: userdata,
                            content:msj,                        
                        })
            }
        })
            
    })
   

    
})








app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))


app.get('/', (req,res) => {
    res.sendFile(__dirname+"/public/index.html")  
})

app.post('/', async (req,res) => {
    userdata =  req.body
    console.log(userdata)
    res.redirect("/chat")
    
    
})

app.get('/chat', (req, res) => {
    res.sendFile(__dirname+"/public/chat.html")
})



   




server.listen(port, ()=> {
    console.log(` WebSocket Server is Opened`)
})




 