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
  const words = data.split("\n");
  const index = dayNumber - 1;
  if (index >= 0 && index < words.length) {
    return words[index].trim();
  } else {
    return await getRandomWordFromFile();
  }
}

export default async function Home() {
  const cookieStore = cookies();
  const number = getGameNumber();
  const word = await getDailyWord(number);
  const synonyms = await getSynonyms(word);
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
