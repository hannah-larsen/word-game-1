const fs = require("fs");
const path = require("path");

function processFile(filePath) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    const lines = data.split("\n");
    const filteredWords = lines.filter(
      (line) =>
        !line.startsWith("    ") && // Filter out indented lines
        line.trim().length >= 4 && // Filter out words less than 4 characters
        line.trim().length <= 8 && // Filter out words more than 8 characters
        !/[A-Z]/.test(line) && // Filter out words with capitalized letters
        /^[a-z]+$/.test(line.trim()) // Only allow words with lowercase letters
    );

    const outputFile = path.join(
      __dirname,
      "./../../../public/filteredWords.txt"
    );
    fs.writeFile(outputFile, filteredWords.join("\n"), "utf8", (err) => {
      if (err) {
        console.error("Error writing filtered words to file:", err);
        return;
      }
      console.log("Filtered words written to:", outputFile);
    });
  });
}

const filePath = path.join(__dirname, "2+2+3cmn.txt");
processFile(filePath);
