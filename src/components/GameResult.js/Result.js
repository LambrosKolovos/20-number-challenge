import React from "react";

function Result({ gameState }) {
  const isWin =
    gameState.every((v, i, a) => !i || a[i - 1] <= v) && !gameState.includes(0);
  return (
    <>
      {isWin ? (
        <>
          <img src="./victory.png" width={100}></img>
          <div style={{ fontSize: "25px" }}>Congratulations!</div>
        </>
      ) : (
        <>
          <img src="./defeat.png" width={100}></img>
          <div style={{ fontSize: "25px" }}>You lost!</div>
        </>
      )}
    </>
  );
}

export default Result;
