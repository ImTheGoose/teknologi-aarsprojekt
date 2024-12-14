const inputMessage = document.getElementById("newMessage")
const sendButton = document.getElementById("sendButton")
const bottomSpacer = document.getElementById("bottomSpacer")
const messageContainer = document.getElementById("messageContainer")

sendButton.addEventListener("click", function(){
    addMessage(inputMessage.value, true)
})

function onLoad(){
    scrollToBottom()
}

function scrollToBottom(){
    messageContainer.scrollTop = messageContainer.scrollHeight
}

function test(){
    setTimeout(function() {
        addMessage("Test me bitch", false)
    }, 1000);
}

function addMessage(msg, fromUser){
    if (msg === null || msg === ""){ return; }

    let newEl = document.createElement("div")
    newEl.classList = "messageLine"

    let newMSG = document.createElement("p")
    newMSG.classList = "message"
    if(fromUser) { newMSG.classList = "message fromUser" }
    newMSG.innerHTML = msg

    newEl.append(newMSG)

    inputMessage.value = ""

    messageContainer.insertBefore(newEl, bottomSpacer)
    scrollToBottom()
    if(fromUser) { test() }

}