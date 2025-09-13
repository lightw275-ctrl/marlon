const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

let score = { teamA: 0, teamB: 0 };

// Socket.io
io.on("connection", (socket) => {
  console.log("Nekdo se je povezal");
  socket.emit("scoreUpdate", score);

  socket.on("updateScore", (data) => {
    score = { ...score, ...data };
    io.emit("scoreUpdate", score);
  });
});

// Serve frontend build
const frontendBuildPath = path.join(__dirname, "frontend-build");
app.use(express.static(frontendBuildPath));

// Routes
app.get("/admin", (req, res) => {
  res.sendFile(path.join(frontendBuildPath, "index.html"));
});

app.get("/overlay", (req, res) => {
  res.sendFile(path.join(frontendBuildPath, "index.html"));
});

// Catch-all for frontend routes
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendBuildPath, "index.html"));
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get("/admin", (req, res) => res.sendFile(path.join(frontendBuildPath, "index.html")));
app.get("/overlay", (req, res) => res.sendFile(path.join(frontendBuildPath, "index.html")));
