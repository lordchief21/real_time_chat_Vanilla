(function ()  {

    let sendButton = document.querySelector("#sendmsj");
    let messages = document.querySelector("#chat-frame");
    const messageBox = document.querySelector("#messageContainer");
    


    let ws;

    const showMessage = (msj,user, nameClass) => {
        const chatBubble = document.createElement("div")
        const username = document.createElement("p")
        const username_node = document.createTextNode(`\n${user}`)
        const para = document.createElement("p")
        const node = document.createTextNode(`${msj}`)
        username.appendChild(username_node)
        chatBubble.appendChild(username)
        para.appendChild(node)
        chatBubble.appendChild(para)
        // document.querySelector("#chat-frame").appendChild(username)
        document.querySelector("#chat-frame").appendChild(chatBubble)
        // username.className = nameClass
        chatBubble.className = nameClass
        chatBubble.style.borderRadius = "15px"
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

        ws.onmessage =  async ({data}) => {
            data = JSON.parse(data)
            console.log("2",typeof(data), data)
            showMessage(data.msj,data.user, "alert alert-warning bubble-chat_received")
            
        };

        ws.onclose = () => {
            ws = null
        };

        sendButton.onclick = () => {
            if(!ws) {
                showMessage('An error ocurred with WebSocket')
                return ;
            }
            let messa = {user: localStorage.getItem("username"), msj:messageBox.value}
            ws.send(JSON.stringify(messa));
            showMessage(messageBox.value, messa.user ,"alert alert-primary bubble-chat");
        }
    };

    init()
} )()