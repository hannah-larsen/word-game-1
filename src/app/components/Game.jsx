"use client";
import { useState, useEffect } from "react";
import WordInput from "./WordInput";
import SynonymFragment from "./SynonymFragment";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import GameOverDialogButton from "./GameOverDialogButton";
import { getSaveData, setSaveData } from "../hooks/useSavestate";

export default function Game({ number = 10, target, synonyms, definition }) {
  const [userInput, setUserInput] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [guessCount, setGuessCount] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const [gameState, setGameState] = useState("ongoing");

  const scrambledTarget = target.split("").sort().join("");

  function onSubmitGuess() {
    if (userInput === target) {
      setFeedbackMessage("");
      setGameState("win");
      setSaveData(number, {
        solved: true,
        numGuesses: guessCount + 1,
        numHints: guessCount,
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
      numHints: guessCount,
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
      <div className="w-full max-w-3xl flex flex-col items-center p-2 gap-4">
        <div className="min-h-16 flex justify-center items-center text-center">
          <p className="text-base text-balance">
            {hintCount >= 3 && <b>{scrambledTarget}: </b>}
            {hintCount >= 2 && definition}
          </p>
        </div>
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
          firstLetter={hintCount >= 1 ? target[0] : null}
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
            hintCount={hintCount}
          />
        )}
        <p className="text-sm">{feedbackMessage}</p>
        <Button
          variant="ghost"
          className="mt-2"
          disabled={gameState !== "ongoing" || hintCount > 2}
          onClick={() =>
            setHintCount((count) => {
              return count + 1;
            })
          }
        >
          {hintCount === 0 && "📩 Get hint #1: First Letter"}
          {hintCount === 1 && "🔍 Get hint #2: Definiton"}
          {hintCount === 2 && "🧩 Get hint #3: Scrambled Word"}
          {hintCount > 2 && "😬 Out of hints!"}
        </Button>
        <Button
          variant="ghost"
          disabled={gameState !== "ongoing"}
          onClick={() => onGiveUp()}
        >
          Give Up
        </Button>
      </div>
    </div>
  );
}
