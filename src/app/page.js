import Game from "./components/Game";
import { cookies } from "next/headers";
import { getWordDefinition } from "./api/definition";
import { getGameNumber } from "./utils/manageTime";
import { Suspense } from "react";
import { getDailyWord } from "./utils";

export default async function Page() {
  const cookieStore = cookies();
  const number = getGameNumber();
  const { word, synonyms, definition } = await getDailyWord(number);

  return (
    <Suspense>
      <Game
        number={number}
        target={word.toUpperCase()}
        synonyms={synonyms.slice(0, 7)}
        definition={definition}
      />
    </Suspense>
  );
}
