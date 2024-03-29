export async function getWordDefinition(word) {
  const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  // Timeout promise
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(
      () => reject(new Error("Timeout: No response within 5 seconds")),
      5000
    )
  );

  try {
    // Race fetch against timeout
    const response = await Promise.race([fetch(apiUrl), timeoutPromise]);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - Word not found`);
    }
    const data = await response.json();

    if (
      data.length === 0 ||
      !data[0].meanings ||
      data[0].meanings.length === 0
    ) {
      return "No definition found.";
    }

    for (const meaning of data[0].meanings) {
      if (
        meaning.partOfSpeech === "adjective" &&
        meaning.definitions &&
        meaning.definitions.length > 0
      ) {
        return meaning.definitions[0].definition;
      }
    }

    return data[0].meanings[0].definitions[0].definition;
  } catch (error) {
    console.error(`Failed to fetch definition for ${word}: ${error}`);
    return "An error occurred while fetching the definition.";
  }
}
