export async function getWordDefinition(word) {
  const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - Word not found`);
    }
    const data = await response.json();

    // Check if data is valid
    if (
      data.length === 0 ||
      !data[0].meanings ||
      data[0].meanings.length === 0
    ) {
      return "No definition found.";
    }

    // Try to find an adjective definition first
    for (const meaning of data[0].meanings) {
      if (
        meaning.partOfSpeech === "adjective" &&
        meaning.definitions &&
        meaning.definitions.length > 0
      ) {
        return meaning.definitions[0].definition; // Return the first definition of the adjective meaning
      }
    }

    // If no adjective definition was found, return the first definition available
    return data[0].meanings[0].definitions[0].definition;
  } catch (error) {
    console.error(`Failed to fetch definition for ${word}: ${error}`);
    return "An error occurred while fetching the definition.";
  }
}
