import React from "react";
import "./NumberList.css";

function NumberList({ availableIdx, numbers, handleClick }) {
  return (
    <div>
      {numbers.map((num, index) => (
        <div
          onClick={() => handleClick(index)}
          className={`number-div-container ${
            !availableIdx.includes(index) ? "disabled" : "active"
          }`}
        >
          <div className="number-div-header">{index + 1}</div>
          <div
            className="number-div-value"
            style={{ background: num !== 0 ? "#28c76f" : "" }}
          >
            {num !== 0 ? num : null}
          </div>
        </div>
      ))}
    </div>
  );
}

export default NumberList;
