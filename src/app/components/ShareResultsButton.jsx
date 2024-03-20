"use client";

import { Button } from "./ui/button";
import { Share2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const url = "https://relatle.lol/";

export default function ShareResultsButton({
  win,
  guessCount,
  hintCount,
  number,
}) {
  function generateShareableString() {
    let shareString = "";

    const guessesLine = `- In *${guessCount}* ${
      guessCount === 1 ? "guess 🎯" : "guesses 🎯"
    }`;
    const hintsLine = `- Using *${hintCount}* ${
      hintCount === 1 ? "hint 💡" : "hints 💡"
    }`;

    if (win) {
      shareString += `I won Relatle #${number}! 🎉\n${guessesLine}\n${hintsLine}\n\n Check it out: ${url} 🕹️`;
    } else {
      shareString += `Couldn't crack Relatle #${number} 😔\n${guessesLine}\n${hintsLine}\n\n🧐 Try it yourself: ${url} `;
    }

    return shareString;
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
