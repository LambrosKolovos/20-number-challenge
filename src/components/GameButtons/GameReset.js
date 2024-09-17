import React from "react";
import "./GameButtons.css";

function GameReset({ onClick }) {
  return (
    <>
      <button className="reset-game-button" onClick={onClick}>
        Reset Game
      </button>
    </>
  );
}

export default GameReset;
