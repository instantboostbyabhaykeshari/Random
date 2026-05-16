const io = require("socket.io-client");

const socket = io("http://localhost:5000");

socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("taskCreated", (data) => {
  console.log("New Task:", data);
});

socket.on("taskUpdated", (data) => {
  console.log("Updated Task:", data);
});

socket.on("taskDeleted", (data) => {
  console.log("Deleted Task:", data);
});