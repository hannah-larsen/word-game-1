const example = {
  solved: false,
  numGuesses: 0,
  numHints: 0,
  time: 0,
  dateSolved: "",
};

export function getSaveData(gameNumber) {
  try {
    const saves = JSON.parse(localStorage.getItem("relatleSaves")) || {};
    return saves[gameNumber] || null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function setSaveData(gameNumber, newData) {
  try {
    const saves = JSON.parse(localStorage.getItem("relatleSaves")) || {};
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    newData.datePlayed = formattedDate;
    saves[gameNumber] = newData;
    localStorage.setItem("relatleSaves", JSON.stringify(saves));
  } catch (error) {
    console.log(error);
  }
}

export function clearSaveData() {
  try {
    localStorage.removeItem("relatleSaves");
  } catch (error) {
    console.log(error);
  }
}

export function getUserAvgGuesses() {
  try {
    const saves = JSON.parse(localStorage.getItem("relatleSaves")) || {};
    const gameNumbers = Object.keys(saves).filter(
      (gameNumber) => parseInt(gameNumber, 10) > 0
    );
    const totalGuesses = gameNumbers.reduce(
      (sum, gameNumber) => sum + saves[gameNumber].numGuesses,
      0
    );
    const avgGuesses =
      gameNumbers.length > 0 ? totalGuesses / gameNumbers.length : 0;
    return avgGuesses;
  } catch (error) {
    console.log(error);
    return 0;
  }
}

export function getUserGamesPlayed() {
  try {
    const saves = JSON.parse(localStorage.getItem("relatleSaves")) || {};
    const gameNumbers = Object.keys(saves).filter(
      (gameNumber) => parseInt(gameNumber, 10) > 0
    );
    return gameNumbers.length;
  } catch (error) {
    console.log(error);
    return 0;
  }
}
