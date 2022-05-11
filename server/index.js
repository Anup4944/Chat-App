const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");

const app = express();

const PORT = process.env.PORT || 8000;
app.use(cors());

app.get("/", (req, res) => {
  res.send("Its working!");
});

const server = http.createServer(app);

const io = socketIO(server);

io.on("Connection", () => {
  console.log("New connection");
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
