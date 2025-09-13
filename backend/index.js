const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

// Socket.io logika
let score = { teamA: 0, teamB: 0 };

io.on("connection", (socket) => {
  console.log("Nekdo se je povezal");

  socket.emit("scoreUpdate", score);

  socket.on("updateScore", (data) => {
    score = { ...score, ...data };
    io.emit("scoreUpdate", score);
  });
});

// Serve frontend build
const frontendBuildPath = path.join(__dirname, "../frontend/build");
app.use(express.static(frontendBuildPath));

// Če ni API route, pošlji frontend index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendBuildPath, "index.html"));
});

// Port
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
