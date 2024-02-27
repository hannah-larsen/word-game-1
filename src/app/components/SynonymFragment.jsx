import { useMemo } from "react";
import { Badge } from "./ui/badge";

export default function SynonymFragment({ word, hidden }) {
  function jumbleWord(word) {
    const characters = word.split("");
    for (let i = characters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [characters[i], characters[j]] = [characters[j], characters[i]]; // Swap elements
    }
    return characters.join("");
  }

  function obfuscateWord(word) {
    return "?".repeat(word.length);
  }

  const hiddenWord = useMemo(() => {
    return obfuscateWord(word);
  }, [word]);
  return (
    <Badge variant={hidden ? "outline" : "secondary"}>
      {hidden ? hiddenWord : word}
    </Badge>
  );
}
