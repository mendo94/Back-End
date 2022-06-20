const chatTextBox = document.getElementById("chatTextBox");
const sendMessageBtn = document.getElementById("sendMessageBtn");
const messagesUL = document.getElementById("messagesUL");
const chatContainer = document.getElementById("chatContainer");
const termsAndConditions = document.getElementById("termsAndConditions");

const displayChat = () => {
  chatContainer.classList.remove("hidden");
};
const removeTerms = () => {
  termsAndConditions.classList.add("hidden");
};

const getUsername = function (userId) {
  displayChat();
  removeTerms();
  fetch(`http://localhost:8080/chatroom`)
    .then((response) => response.json())
    .then((results) => {
      const chatText = chatTextBox.value;
      const userItems = results.map(function (user) {
        let onlineUser = user.username;
        let userId = user.userId;
        const chat = {
          userId: userId,
          username: onlineUser,
          message: chatText,
        };
        termsAndConditions.innerHTML = `<button onclick="renderUsername('${chat.userId}')"> hi</button>`;
        socket.emit("chatroom", chat);
      });
    });
};

function renderUsername(chat) {
  const userId = chat;
  fetch(`http://localhost:8080/chatroom/${userId}`)
    .then((response) => response.json())
    .then((results) => {
      console.log(results);
      console.log(results[0].username);
      const date = new Date().toLocaleTimeString();
      const messageItem = `<li>${results[0].username} messaged at ${date}: </li>`;
      messagesUL.insertAdjacentHTML("beforeend", messageItem);
    });
}

socket.on("chatroom", (chat) => {
  console.log(chat);
  fetch(`http://localhost:8080/chatroom/${chat.userId}`)
    .then((response) => response.json())
    .then((results) => {
      console.log(results);
      chatTextBox.value = "";
      const messageItem = `<li>${chat.message}</li>`;
      messagesUL.insertAdjacentHTML("beforeend", messageItem);
    });
});

// const chatTextBox = document.getElementById("chatTextBox");
// const sendMessageBtn = document.getElementById("sendMessageBtn");
// const messagesUL = document.getElementById("messagesUL");
// const chatContainer = document.getElementById("chatContainer");
// const termsAndConditions = document.getElementById("termsAndConditions");

// const displayChat = () => {
//   chatContainer.classList.remove("hidden");
// };
// const removeTerms = () => {
//   termsAndConditions.classList.add("hidden");
// };

// const getUsername = function (userId) {
//   displayChat();
//   removeTerms();
//   fetch(`http://localhost:8080/chatroom`)
//     .then((response) => response.json())
//     .then((results) => {
//       const chatText = chatTextBox.value;
//       const userItems = results.map(function (user) {
//         let onlineUser = user.username;
//         let userId = user.userId;
//         const chat = {
//           userId: userId,
//           username: onlineUser,
//           message: chatText,
//         };
//         termsAndConditions.innerHTML = `<button onclick="what('${chat.userId}')"> hi</button>`;
//         socket.emit("chatroom", chat);
//       });
//     });
// };

// function what(chat) {
//   const userId = chat;
//   fetch(`http://localhost:8080/chatroom/${userId}`)
//     .then((response) => response.json())
//     .then((results) => {
//       console.log(results);
//       console.log(results[0].username);
//       const date = new Date().toLocaleTimeString();
//       const messageItem = `<li>${results[0].username} messaged at ${date}: </li>`;
//       messagesUL.insertAdjacentHTML("beforeend", messageItem);
//     });
// }

// socket.on("chatroom", (chat) => {
//   console.log(chat);
//   fetch(`http://localhost:8080/chatroom/${chat.userId}`)
//     .then((response) => response.json())
//     .then((results) => {
//       console.log(results);
//       chatTextBox.value = "";
//       const messageItem = `<li>${chat.message}</li>`;
//       messagesUL.insertAdjacentHTML("beforeend", messageItem);
//     });
// });
// const chatTextBox = document.getElementById("chatTextBox");
// const sendMessageBtn = document.getElementById("sendMessageBtn");
// const messagesUL = document.getElementById("messagesUL");
// const chatContainer = document.getElementById("chatContainer");
// const termsAndConditions = document.getElementById("termsAndConditions");

// const displayChat = () => {
//   chatContainer.classList.remove("hidden");
// };
// const removeTerms = () => {
//   termsAndConditions.classList.add("hidden");
// };

// const fetchUsername = function () {
//   fetch("http://localhost:8080/chatroom")
//     .then((response) => response.json())
//     .then((results) => {
//       console.log(results);
//       const userItems = results.map(function (user) {
//         termsAndConditions.innerHTML = `
//       <div><p>
//         Do you agree to Chat <a href="#">terms and conditions</a>?
//         </p><button id="startChat" onclick="getUsername(${user.userId})">
//           Start Chatting Now
//         </button>
//       </div>`;
//       });
//     });
// };
// fetchUsername();

// const getUsername = function (userId) {
//   displayChat();
//   removeTerms();
//   fetch(`http://localhost:8080/chatroom/${userId}`)
//     .then((response) => response.json())
//     .then((results) => {
//       sendMessageBtn.addEventListener("click", () => {
//         const chatText = chatTextBox.value;
//         const chat = { message: chatText };
//         socket.emit("chatroom", chat);

//         const date = new Date().toLocaleTimeString();
//         const messageItem = `<li>${results[0].username} messaged at ${date}: ${chat.message}</li>`;
//         messagesUL.insertAdjacentHTML("beforeend", messageItem);
//       });
//     });
// };
// socket.on("chatroom", (chat) => {
//   chatTextBox.value = "";
// });
