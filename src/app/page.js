import Game from "./components/Game";
import fs from "fs";
import path from "path";
import { cookies } from "next/headers";
import { getSynonyms } from "./api/datamuse";
import { getWordDefinition } from "./api/definition";
import { getGameNumber } from "./utils/manageTime";
import { Suspense } from "react";

async function getRandomWordFromFile() {
  const filePath = path.join(process.cwd(), "./public/filteredWords.txt");
  const data = fs.readFileSync(filePath, "utf8");
  const words = data.split("\n");
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex].trim();
}

async function getDailyWord(dayNumber) {
  const filePath = path.join(process.cwd(), "./public/chosenWords.txt");
  const data = fs.readFileSync(filePath, "utf8");
  const lines = data.split("\n");
  const index = dayNumber - 1;

  if (index >= 0 && index < lines.length) {
    const line = lines[index].trim();
    // Check if the line has synonyms (enclosed in square brackets)
    if (line.includes("[")) {
      const [word, synonymsStr] = line.split("[");
      const synonyms = synonymsStr.slice(0, -1).split(", ");
      return { word: word.trim(), synonyms };
    } else {
      const word = line;
      // Fetch synonyms if they are not defined
      const synonyms = await getSynonyms(word);
      return { word, synonyms };
    }
  } else {
    // Assuming getRandomWordFromFile is adjusted accordingly
    const randomWord = await getRandomWordFromFile();
    if (randomWord.synonyms.length === 0) {
      // Fetch synonyms if not available
      randomWord.synonyms = await getSynonyms(randomWord.word);
    }
    return randomWord;
  }
}

export default async function Home() {
  const cookieStore = cookies();
  const number = getGameNumber();
  const { word, synonyms } = await getDailyWord(number);
  const definition = await getWordDefinition(word);
  return (
    <Suspense>
      <Game
        number={number}
        target={word.toUpperCase()}
        synonyms={synonyms.slice(0, 7)}
        definition={definition}
      />
    </Suspense>
  );
}
