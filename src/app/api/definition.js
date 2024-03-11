export async function getWordDefinition(word) {
  const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - Word not found`);
    }
    const data = await response.json();

    // Accessing the first definition of the first meaning of the word
    if (
      data.length > 0 &&
      data[0].meanings.length > 0 &&
      data[0].meanings[0].definitions.length > 0
    ) {
      return data[0].meanings[0].definitions[0].definition;
    } else {
      return "No definition found.";
    }
  } catch (error) {
    console.error(`Failed to fetch definition for ${word}: ${error}`);
    return "An error occurred while fetching the definition.";
  }
}
