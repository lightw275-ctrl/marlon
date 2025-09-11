const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

let score = { teamA: 0, teamB: 0 };

io.on("connection", (socket) => {
  console.log("Nekdo se je povezal");

  // Pošlji trenutni score ob povezavi
  socket.emit("scoreUpdate", score);

  // Posodobi score
  socket.on("updateScore", (data) => {
    score = { ...score, ...data };
    io.emit("scoreUpdate", score); // pošlji vsem klientom
  });
});

server.listen(3001, () => console.log("Server running on port 3001"));
