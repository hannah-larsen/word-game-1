import Game from "./components/Game";
import fs from "fs";
import path from "path";
import { cookies } from "next/headers";
import { getSynonyms } from "./api/datamuse";

async function getRandomWordFromFile(filePath) {
  const data = fs.readFileSync(filePath, "utf8");
  const words = data.split(",");
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex].trim();
}

export default async function Home() {
  const cookieStore = cookies();
  const filePath = path.join(process.cwd(), "./public/word-list.txt");
  const word = await getRandomWordFromFile(filePath);
  const synonyms = await getSynonyms(word); // Fetch all synonyms for the word
  return <Game target={word.toUpperCase()} synonyms={synonyms.slice(0, 7)} />;
}
