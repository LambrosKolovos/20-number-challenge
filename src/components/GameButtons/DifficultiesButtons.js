import React from "react";
import "./GameButtons.css";

function DifficultiesButtons({ activeDifficulty, changeDifficulty }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <button className="difficulty-button" onClick={() => changeDifficulty(5)}>
        EASY
      </button>
      <button
        className="difficulty-button"
        onClick={() => changeDifficulty(10)}
      >
        MEDIUM
      </button>
      <button
        className="difficulty-button"
        onClick={() => changeDifficulty(15)}
      >
        HARD
      </button>
      <button
        className="difficulty-button"
        onClick={() => changeDifficulty(20)}
      >
        IMPOSSIBLE
      </button>
    </div>
  );
}

export default DifficultiesButtons;
