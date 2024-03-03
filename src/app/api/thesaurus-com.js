const axios = require("axios");
const cheerio = require("cheerio");

export async function getSynonyms(word) {
  const url = `https://www.thesaurus.com/browse/${word}`;
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const divSynonyms = []; // Array to hold arrays of synonyms from each div

    $("div.nMW14nFcYlw7pQJdjUvt").each((i, div) => {
      const p = $(div)
        .find("p")
        .filter((i, p) => $(p).text().trim() === "Strongest matches");
      if (p.length > 0) {
        const synonyms = [];
        $(div)
          .find("ul li")
          .each((i, elem) => {
            synonyms.push($(elem).text());
          });
        divSynonyms.push(synonyms);
      }
    });

    // Now iterate through divSynonyms in a round-robin fashion
    const collectedSynonyms = [];
    let done = false;
    let index = 0; // To keep track of word position within each div's synonyms

    while (!done) {
      done = true; // Assume we're done unless a word is added in this iteration
      divSynonyms.forEach((synonyms) => {
        if (index < synonyms.length) {
          collectedSynonyms.push(synonyms[index]);
          done = false; // Not done since at least one word was added
        }
      });
      index++; // Move to the next word position
    }

    const uniqueSynonyms = Array.from(new Set(collectedSynonyms));
    return uniqueSynonyms;
  } catch (error) {
    console.error("Error fetching synonyms:", error);
    return [];
  }
}
