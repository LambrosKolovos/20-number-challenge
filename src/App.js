import React, { useState, useEffect, useCallback } from "react";
import AnimatedNumbers from "react-animated-numbers";
import "./App.css";
import NumberList from "./components/NumberList/NumberList";
import DifficultiesButtons from "./components/GameButtons/DifficultiesButtons";
import GameReset from "./components/GameButtons/GameReset";
import Result from "./components/GameResult.js/Result";
import Footer from "./components/Footer";

function getRandomExcluding(excludedNumbers) {
  const min = 0;
  const max = 1000;
  let randomNumber;

  do {
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (excludedNumbers.includes(randomNumber));

  return randomNumber;
}

function App() {
  const [num, setNum] = useState(getRandomExcluding([]));
  const [currentNumbers, setCurrentNumbers] = useState([]);
  const [difficulty, setDifficulty] = useState(5);

  useEffect(() => {
    setCurrentNumbers(Array(difficulty).fill(0));
    setNum(getRandomExcluding([]));
  }, [difficulty]);

  const handleClick = (index) => {
    if (!availableIndexes().includes(index)) return;
    const newValues = [...currentNumbers];
    if (currentNumbers[index] === 0) {
      newValues[index] = num;
      setCurrentNumbers(newValues);
      setNum(getRandomExcluding(newValues));
    }
  };

  const gameReset = () => {
    setCurrentNumbers(Array(difficulty).fill(0));
    setNum(getRandomExcluding([]));
  };

  const availableIndexes = useCallback(() => {
    let available = [];
    let numbersAdded = currentNumbers.filter((num) => num !== 0);
    let startIndex;
    let endIndex;
    if (numbersAdded.length === 0) {
      return [...currentNumbers.map((el, index) => index)];
    }
    if (numbersAdded.length === 1) {
      if (num > numbersAdded[0]) {
        startIndex = currentNumbers.indexOf(numbersAdded[0]);
        endIndex = currentNumbers.length;
      } else {
        startIndex = 0;
        endIndex = currentNumbers.indexOf(numbersAdded[0]);
      }
      return Array.from(
        { length: endIndex - startIndex },
        (_, i) => i + startIndex
      );
    }
    let min = Math.min(...currentNumbers.filter((num) => num !== 0));
    let max = Math.max(...currentNumbers);
    if (num > max) {
      startIndex = currentNumbers.indexOf(max) + 1;
      endIndex = currentNumbers.length;
    } else if (num < min) {
      startIndex = 0;
      endIndex = currentNumbers.indexOf(min);
    } else {
      for (let i = 0; i < currentNumbers.length; i++) {
        if (num > currentNumbers[i] && currentNumbers[i] > 0)
          min = currentNumbers[i];
        if (num < currentNumbers[i]) {
          max = currentNumbers[i];
          break;
        }
      }
      startIndex = currentNumbers.indexOf(min) + 1;
      endIndex = currentNumbers.indexOf(max);
    }
    available = Array.from(
      { length: endIndex - startIndex },
      (_, i) => i + startIndex
    );

    return available;
  }, [currentNumbers]);

  const gameOver = useCallback(() => {
    return availableIndexes.length === 0;
  });
  return (
    <>
      <div className="container">
        <NumberList
          availableIdx={availableIndexes()}
          numbers={currentNumbers}
          handleClick={handleClick}
          currentNum={num}
        />
        <div className="container-controls">
          <div className="container-middle">
            <AnimatedNumbers
              className="current-number-container"
              transitions={(index) => ({
                type: "spring",
                duration: index - 0.5,
              })}
              animateToNumber={num}
              fontStyle={{
                fontSize: 100,
              }}
            />
            {availableIndexes().length === 0 && (
              <Result gameState={currentNumbers} />
            )}
          </div>
          <div className="game-buttons">
            <DifficultiesButtons
              activeDifficulty={difficulty}
              changeDifficulty={(difficulty) => setDifficulty(difficulty)}
            />
            <GameReset onClick={gameReset} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
