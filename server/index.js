const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");

const app = express();

const PORT = process.env.PORT || 8000;
app.use(cors());

const users = [{}];

app.get("/", (req, res) => {
  res.send("Its working!");
});

const server = http.createServer(app);

const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("New connection");

  socket.on("joined", ({ user }) => {
    users[socket.id] = user;
    console.log(`${user} has joined`);

    socket.broadcast.emit("userJoined", {
      user: "Admin",
      message: `${users[socket.id]} has joined`,
    });
  });

  socket.emit("Welcome", { user: "Admin", message: "Welcome to the chat" });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
