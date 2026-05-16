require("dotenv").config();

const http = require("http");

const app = require("./app");
const connectDB = require("./config/db");

const { Server } = require("socket.io");

const PORT = process.env.PORT || 5000;

// connect database
connectDB();

// create http server
const server = http.createServer(app);

// socket server
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// socket connection
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// make io accessible everywhere
app.set("io", io);

// start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});