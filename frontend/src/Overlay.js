import React from "react";
import "./Overlay.css";

function Overlay({ score }) {
  return (
    <div className="overlay">
      <span className="teamA">{score.teamA}</span>
      <span className="teamB">{score.teamB}</span>
    </div>
  );
}

export default Overlay;
