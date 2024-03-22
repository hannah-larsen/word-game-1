import fs from "fs";
import path from "path";
import { getSynonyms } from "./api/datamuse";

export async function getRandomWordFromFile() {
  const filePath = path.join(process.cwd(), "./public/filteredWords.txt");
  const data = fs.readFileSync(filePath, "utf8");
  const words = data.split("\n");
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex].trim();
}

export async function getDailyWord(dayNumber) {
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
    const word = await getRandomWordFromFile();
    const synonyms = await getSynonyms(word);
    return { word, synonyms };
  }
}
