"use client";
import { useState } from "react";
import WordInput from "./WordInput";
import SynonymFragment from "./SynonymFragment";
import { Button } from "./ui/button";
import GameOverDialogButton from "./GameOverDialogButton";

export default function Game({ target, synonyms }) {
  const [userInput, setUserInput] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [guessCount, setGuessCount] = useState(0);
  const [gameState, setGameState] = useState("ongoing");
  const [showFirstLetter, setShowFirstLetter] = useState(false);

  function onSubmitGuess() {
    if (userInput === target) {
      setFeedbackMessage("You got it!");
      setGameState("win");
    } else {
      setFeedbackMessage("Try again buddy!");
      setUserInput("");
    }
    setGuessCount((guessCount) => guessCount + 1);
  }

  function onGiveUp() {
    setGameState("lose");
    setUserInput(target);
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-3xl flex flex-col items-center p-2 md:pt-16 max-md:pt-8 gap-4">
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
          <GameOverDialogButton gameState={gameState} />
        )}
        <Button
          variant="ghost"
          className="mt-2"
          onClick={() =>
            setShowFirstLetter((showFirstLetter) => {
              return !showFirstLetter;
            })
          }
        >
          Show/Hide first letter
        </Button>
        <Button variant="ghost" onClick={() => onGiveUp()}>
          Give Up
        </Button>
        <p>{feedbackMessage}</p>
        <p className="text-orange-50">{target}</p>
      </div>
    </div>
  );
}
