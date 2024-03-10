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
import { Trophy, HeartCrack } from "lucide-react";
import { useEffect, useState } from "react";

export default function GameOverDialogButton({ gameState = "ongoing" }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(gameState !== "ongoing");
    }, 1000);

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
          <DialogDescription>Relatle #123</DialogDescription>
        </DialogHeader>
        <p>Good job! Today&apos;s word was SLIME.</p>
        <p>Meaning of slime here.</p>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
