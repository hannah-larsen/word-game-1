const axios = require("axios");
require("dotenv").config({ path: ".env.local" });

export async function getSynonyms(word) {
  const apiKey = process.env.WEBSTER_KEY;
  const url = `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=${apiKey}`;
  try {
    const response = await axios.get(url);
    const entries = response.data; // The response is an array of entries
    let synonyms = [];

    // Iterate through each entry to extract synonyms
    entries.forEach((entry) => {
      if (entry.meta && entry.meta.syns) {
        // Each element in meta.syns is an array of synonyms; flatten and add them
        entry.meta.syns.forEach((synGroup) => {
          synonyms = synonyms.concat(synGroup);
        });
      }
    });

    // Remove duplicates
    synonyms = [...new Set(synonyms)];

    return synonyms;
  } catch (error) {
    console.error("Error fetching synonyms:", error.message);
    return [];
  }
}

// Example usage
const apiKey = "your_api_key_here"; // Replace this with your actual API key
