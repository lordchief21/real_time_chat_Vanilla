(function ()  {

    let sendButton = document.querySelector("#sendmsj");
    let messages = document.querySelector("#chat-frame");
    const messageBox = document.querySelector("#messageContainer");
    


    let ws;

    const showMessage = (msj, nameClass) => {
        const para = document.createElement("p")
        const node = document.createTextNode(`\n${msj}`)
        para.appendChild(node)
        document.getElementById("chat-frame")
        document.querySelector("#chat-frame").appendChild(para)
        para.className = nameClass
        para.style.borderRadius = "15px"
        // para.textContent += `\n${msj}`;
        messages.scrollTop = messages.scrollHeight;
        messages.value = "";
    }


    function init(){
        
        if(ws) {
            ws.onerror = ws.onopen = ws.onclose = null;
            ws.close();
            console.log("WebSocket Closed")
        }

        console.log("Vengo del index.html",localStorage.getItem("username"))

        ws = new WebSocket('ws://localhost:9000');
        ws.onopen = () => {
            console.log('WebSocket Connected')
        }

        ws.onmessage = async ({data}) => {
            data = JSON.parse(data)
            console.log(typeof(data), data)
            showMessage(data.msj, "alert alert-warning bubble-chat_received")
            
        };

        ws.onclose = () => {
            ws = null
        };

        sendButton.onclick = () => {
            if(!ws) {
                showMessage('An error ocurred with WebSocket')
                return ;
            }
            
            ws.send(messageBox.value);
            showMessage(messageBox.value, "alert alert-primary bubble-chat");
        }
    };

    init()
} )()