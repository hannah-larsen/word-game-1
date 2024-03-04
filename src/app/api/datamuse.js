export async function getSynonyms(word) {
  const url = `https://api.datamuse.com/words?ml=${word}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching synonyms: ${response.statusText}`);
    }
    const data = await response.json();
    const synonyms = data
      .map((entry) => entry.word)
      .filter((synonym) => !synonym.includes(word));

    return synonyms;
  } catch (error) {
    console.error(error.message);
    return [];
  }
}
