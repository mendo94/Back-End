const messageForm = document.getElementById("send-container");
const messageContainer = document.getElementById("message-container");
const messageInput = document.getElementById("message-input");
const date = new Date().toLocaleTimeString();

const name = prompt(
  "By entering your name below, you agree to using the chat for movie disucssion only? Sign your name below:"
);
appendMessage("you joined");
socket.emit("new-user", name);

socket.on("chat-message", (data) => {
  appendMessage(`Received ${date}   ${data.name}  Says:   ${data.message}`);
});

socket.on("user-connected", (name) => {
  appendMessage(`${name} connected`);
});

socket.on("user-disconnected", (name) => {
  appendMessage(`${name} disconnected`);
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  appendMessage(`Sent at ${date} You: ${message}`);
  socket.emit("send-chat-message", message);
  messageInput.value = "";
});

function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}
