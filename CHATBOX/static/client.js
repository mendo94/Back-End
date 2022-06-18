const chatTextBox = document.getElementById("chatTextBox");
const sendMessageBtn = document.getElementById("sendMessageBtn");
const messagesUL = document.getElementById("messagesUL");

sendMessageBtn.addEventListener("click", () => {
  const chatText = chatTextBox.value;
  const chat = { message: chatText };
  getUsername("username");
  socket.emit("chatroom", chat);
});

socket.on("chatroom", (chat) => {
  chatTextBox.value = "";
  console.log(chat);
  const date = new Date().toLocaleTimeString();

  const messageItem = `<li>Messaged at ${date}: ${chat.message}</li>`;
  messagesUL.insertAdjacentHTML("beforeend", messageItem);
});

const getUsername = function () {
  fetch("http://localhost:8080/chatroom/chat")
    .then((response) => response.json())
    .then((result) => {
      renderUsername(result[0].username);
    });
};

const renderUsername = function (result) {
  const html = `<h5>${result}</h5>`;
  messagesUL.insertAdjacentHTML("beforeend", html);
};
