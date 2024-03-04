const axios = require("axios");
require("dotenv").config({ path: ".env.local" });

export async function getSynonyms(word) {
  const apiKey = process.env.WEBSTER_KEY;
  const url = `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=${apiKey}`;
  try {
    const response = await axios.get(url);
    const entries = response.data;
    let synonyms = [];

    entries.forEach((entry) => {
      if (entry.meta && entry.meta.syns) {
        entry.meta.syns.forEach((synGroup) => {
          synonyms = synonyms.concat(synGroup);
        });
      }
    });

    synonyms = [...new Set(synonyms)];

    return synonyms;
  } catch (error) {
    console.error("Error fetching synonyms:", error.message);
    return [];
  }
}
