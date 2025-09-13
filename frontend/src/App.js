import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./App.css";

const socket = io("https://basketball-counter-backend.onrender.com"); 
// lokalno testiranje: io("http://localhost:3001")

function App() {
  const [teamA, setTeamA] = useState(0);
  const [teamB, setTeamB] = useState(0);

  useEffect(() => {
    socket.on("scoreUpdate", ({ teamA, teamB }) => {
      setTeamA(teamA);
      setTeamB(teamB);
    });

    const handleKeyDown = (e) => {
      if (e.key === "q") socket.emit("updateScore", { team: "A", delta: 1 });
      if (e.key === "w") socket.emit("updateScore", { team: "A", delta: -1 });
      if (e.key === "a") socket.emit("updateScore", { team: "B", delta: 1 });
      if (e.key === "s") socket.emit("updateScore", { team: "B", delta: -1 });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="scoreboard">
      <div className="team">
        <h2>Team A</h2>
        <div className="score">{teamA}</div>
      </div>
      <div className="separator">:</div>
      <div className="team">
        <h2>Team B</h2>
        <div className="score">{teamB}</div>
      </div>
    </div>
  );
}

export default App;
