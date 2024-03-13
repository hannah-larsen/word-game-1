"use client";
import { useState, useEffect } from "react";
import WordInput from "./WordInput";
import SynonymFragment from "./SynonymFragment";
import { Button } from "./ui/button";
import GameOverDialogButton from "./GameOverDialogButton";
import { getSaveData, setSaveData } from "../hooks/useSavestate";

export default function Game({ number = 10, target, synonyms, definition }) {
  const [userInput, setUserInput] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [guessCount, setGuessCount] = useState(0);
  const [gameState, setGameState] = useState("ongoing");
  const [showFirstLetter, setShowFirstLetter] = useState(false);

  function onSubmitGuess() {
    if (userInput === target) {
      setFeedbackMessage("You got it!");
      setGameState("win");
      setSaveData(number, {
        solved: true,
        numGuesses: guessCount + 1,
        numHints: showFirstLetter ? 1 : 0,
        time: 0,
      });
    } else {
      setFeedbackMessage("Try again buddy!");
      setUserInput("");
    }
    setGuessCount((guessCount) => guessCount + 1);
  }

  function onGiveUp() {
    setGameState("lose");
    setSaveData(number, {
      solved: false,
      numGuesses: guessCount + 1,
      numHints: showFirstLetter ? 1 : 0,
      time: 0,
    });
    setUserInput(target);
  }

  useEffect(() => {
    const gameData = getSaveData(number);
    if (gameData && gameData.solved) {
      setGameState("win");
      setUserInput(target);
      setGuessCount(gameData.numGuesses);
      return;
    }

    if (gameData && !gameData.solved) {
      setGameState("lose");
      setUserInput(target);
    }
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-3xl flex flex-col items-center p-2 md:pt-16 max-md:pt-4 gap-4">
        <div className="flex flex-wrap gap-2 justify-center max-w-xl max-md:px-4">
          {synonyms.map((word, index) => (
            <SynonymFragment
              hidden={gameState === "ongoing" && index > guessCount}
              word={word}
              key={index}
            />
          ))}
        </div>
        <WordInput
          length={target.length}
          value={userInput}
          onChange={(newValue) => setUserInput(newValue)}
          onSubmit={() => onSubmitGuess()}
          firstLetter={showFirstLetter ? target[0] : null}
          gameState={gameState}
        />
        {gameState === "ongoing" ? (
          <Button size="lg" onClick={() => onSubmitGuess()}>
            Submit
          </Button>
        ) : (
          <GameOverDialogButton
            gameState={gameState}
            target={target}
            number={number}
            definition={definition}
            guessCount={guessCount}
          />
        )}
        <p className="text-sm">{feedbackMessage}</p>
        <Button
          variant="ghost"
          className="mt-2"
          disabled={gameState !== "ongoing"}
          onClick={() =>
            setShowFirstLetter((showFirstLetter) => {
              return !showFirstLetter;
            })
          }
        >
          Show/Hide first letter
        </Button>
        <Button
          variant="ghost"
          disabled={gameState !== "ongoing"}
          onClick={() => onGiveUp()}
        >
          Give Up
        </Button>

        <p className="text-orange-50">{target}</p>
      </div>
    </div>
  );
}
