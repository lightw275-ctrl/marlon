import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

// Tukaj zamenjaj z URL-jem tvojega backend-a na Render ali lokalno
const socket = io("http://localhost:3001");

function App() {
  const [score, setScore] = useState({ teamA: 0, teamB: 0 });

  useEffect(() => {
    socket.on("scoreUpdate", (newScore) => setScore(newScore));

    const handleKey = (e) => {
      if (e.key === "q") socket.emit("updateScore", { teamA: score.teamA + 1 });
      if (e.key === "w") socket.emit("updateScore", { teamB: score.teamB + 1 });
      if (e.key === "a") socket.emit("updateScore", { teamA: score.teamA - 1 });
      if (e.key === "s") socket.emit("updateScore", { teamB: score.teamB - 1 });
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [score]);

  return (
  <div
    style={{
      fontSize: "100px",
      textAlign: "center",
      marginTop: "100px",
      backgroundColor: "transparent", // OBS bo videl transparent
      color: "white",                 // besedilo bo belo
      width: "100vw",
      height: "100vh",
    }}
  >
    <div>Team A: <span>{score.teamA}</span></div>
    <div>Team B: <span>{score.teamB}</span></div>
    <div style={{ marginTop: "50px" }}>
      <button onClick={() => socket.emit("updateScore", { teamA: score.teamA + 1 })}>+ Team A</button>
      <button onClick={() => socket.emit("updateScore", { teamB: score.teamB + 1 })}>+ Team B</button>
    </div>
  </div>
);
}

export default App;
