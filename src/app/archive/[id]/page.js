import Game from "@/app/components/Game";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getGameNumber } from "@/app/utils/manageTime";
import { getDailyWord } from "@/app/utils";

export default async function Page({ params }) {
  const cookieStore = cookies();
  const maxNumber = getGameNumber();
  const { id } = params;

  if (isNaN(id) || id > maxNumber) {
    redirect("/404");
  }

  const { word, synonyms, definition } = await getDailyWord(id);

  return (
    <Suspense>
      <Game
        number={id}
        target={word.toUpperCase()}
        synonyms={synonyms.slice(0, 7)}
        definition={definition}
      />
    </Suspense>
  );
}
