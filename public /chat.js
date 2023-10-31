function start()  {

        let sendButton = document.querySelector("#sendmsj");
        let messages = document.querySelector("#message");
        const messageBox = document.querySelector("#messageContainer");


        let ws;

        const showMessage = (msj) => {
            messages.textContent += ` \n\n ${msj}`;
            messages.scrollTop = messages.scrollHeight;
            messages.value = "";
        }

        function init(){
            if(!ws) {
                ws.close();
            }
    
            ws = new WebSocket('ws://localhost:9000');
            ws.onopen = () => {
                console.log('WebSocket Connected')
            }
    
            ws.onmessage = ({data}) => {
                showMessage(data)
            };

            ws.onclose = () => {
                ws = null
            };

            sendButton.onclick = () => {
                if(!ws) {
                    showMessage('An error ocurred with WebSocket')
                }
                
                ws.send(messageBox);
            }
        };

        init()
}

start();