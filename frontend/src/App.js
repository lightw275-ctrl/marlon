import React, { useState } from "react";
import "./index.css"; // ker si rekel da imas index.css, ne App.css

function App() {
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);

  return (
    <div className="scoreboard">
      {/* Hits Panel */}
      <div className="panel">
        <h1>{hits}</h1>
        <div className="label">Hits</div>
        <div className="buttons">
          <button className="add" onClick={() => setHits(hits + 1)}>+1 Hit</button>
          <button className="remove" onClick={() => setHits(Math.max(hits - 1, 0))}>-1 Hit</button>
        </div>
      </div>

      {/* Misses Panel */}
      <div className="panel">
        <h1>{misses}</h1>
        <div className="label">Misses</div>
        <div className="buttons">
          <button className="add" onClick={() => setMisses(misses + 1)}>+1 Miss</button>
          <button className="remove" onClick={() => setMisses(Math.max(misses - 1, 0))}>-1 Miss</button>
        </div>
      </div>
    </div>
  );
}

export default App;
