"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import Timer from "./Timer";
import { Trophy, HeartCrack } from "lucide-react";
import { useEffect, useState } from "react";
import ShareResultsButton from "./ShareResultsButton";

export default function GameOverDialogButton({
  gameState = "ongoing",
  number,
  target,
  definition,
  guessCount,
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(gameState !== "ongoing");
    }, 1500);

    return () => clearTimeout(timer);
  }, [gameState]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className={`
          ${
            gameState === "win" &&
            "bg-lime-200 hover:bg-lime-100 text-foreground"
          }
          ${
            gameState === "lose" &&
            "bg-red-200 hover:bg-red-100 text-foreground"
          }
          `}
        >
          {gameState === "win" ? (
            <Trophy className="mr-2 h-4 w-4" />
          ) : (
            <HeartCrack className="mr-2 h-4 w-4" />
          )}
          {gameState === "win" ? "You got it!" : "Game over"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {gameState === "win" ? "You got it!" : "Game over"}
          </DialogTitle>
          <DialogDescription>Relatle #{number}</DialogDescription>
        </DialogHeader>
        <p>
          {gameState === "win" ? "Good job!" : "Better luck next time!"} The
          hidden word was <b>{target}</b>. <br />{" "}
          <i className="text-muted-foreground">{definition}</i>
        </p>
        <p>
          New daily relatle in: <Timer />
        </p>
        <ShareResultsButton
          win={gameState === "win"}
          guessCount={guessCount}
          number={number}
        />

        {/*        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
          </DialogFooter>*/}
      </DialogContent>
    </Dialog>
  );
}
