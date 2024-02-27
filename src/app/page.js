import Game from "./components/Game";
import fs from "fs";
import path from "path";

async function getSynonyms(word) {
  try {
    const response = await fetch(
      `https://api.datamuse.com/words?ml=${word}&max=10`
    );
    if (!response.ok) {
      throw new Error(`Error fetching synonyms: ${response.statusText}`);
    }
    const synonyms = await response.json();
    return synonyms
      .filter((syn) => !syn.word.includes(word))
      .map((syn) => syn.word);
  } catch (error) {
    console.error(error);
    return [];
  }
}

// This function simulates an asynchronous file read operation
async function getRandomWordFromFile(filePath) {
  const data = fs.readFileSync(filePath, "utf8");
  const words = data.split(",");
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex].trim();
}

export default async function Home() {
  const filePath = path.join(process.cwd(), "./public/word-list.txt");
  const word = await getRandomWordFromFile(filePath);
  const synonyms = await getSynonyms(word);
  return <Game target={word.toUpperCase()} synonyms={synonyms} />;
}
