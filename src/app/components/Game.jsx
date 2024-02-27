"use client";
import { useState } from "react";
import WordInput from "./WordInput";
import SynonymFragment from "./SynonymFragment";
import { Button } from "./ui/button";

export default function Game({ target, synonyms }) {
  const [userInput, setUserInput] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [guessCount, setGuessCount] = useState(0);
  const [hasWon, setHasWon] = useState(false);
  const [showFirstLetter, setShowFirstLetter] = useState(false);

  function onSubmitGuess() {
    if (userInput === target) {
      setFeedbackMessage("You got it!");
      setHasWon(true);
    } else {
      setFeedbackMessage("Try again buddy!");
      setUserInput("");
    }
    setGuessCount((guessCount) => guessCount + 1);
  }

  return (
    <div className="flex justify-center">
      <div
        className="w-3xl flex flex-col items-center p-2 pt-6 gap-4"
        style={{ maxWidth: "100vw" }}
      >
        <div className="flex flex-wrap gap-2 justify-center">
          {synonyms.map((word, index) => (
            <SynonymFragment
              hidden={!hasWon && index > guessCount}
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
          disabled={hasWon}
        />
        <Button size="lg" onClick={() => onSubmitGuess()}>
          Submit
        </Button>
        <Button
          variant="ghost"
          onClick={() =>
            setShowFirstLetter((showFirstLetter) => {
              return !showFirstLetter;
            })
          }
        >
          Show/Hide first letter
        </Button>
        <p>{feedbackMessage}</p>
        <p className="text-orange-50">{target}</p>
      </div>
    </div>
  );
}
