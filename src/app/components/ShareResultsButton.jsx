"use client";

import { Button } from "./ui/button";
import { Share2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const url = "https://word-game-umber.vercel.app/";

export default function ShareResultsButton({ win, guessCount, number }) {
  function generateShareableString() {
    if (win) {
      return `I got relatle #${number} in ${guessCount} ${
        guessCount === 1 ? "guess" : "guesses"
      }! \n ${url}`;
    } else {
      return `I couldn't figure out relatle #${number}. \n ${url}`;
    }
    return "Error generating shareable string ;(";
  }
  return (
    <Popover>
      <Button
        className=""
        asChild
        onClick={() => {
          navigator.clipboard.writeText(generateShareableString());
        }}
      >
        <PopoverTrigger>
          <Share2 className="mr-2 h-4 w-4" />
          Share my results
        </PopoverTrigger>
      </Button>
      <PopoverContent className="text-xs p-2 w-auto -mt-2">
        Copied to clipboard!
      </PopoverContent>
    </Popover>
  );
}
