"use client";

import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { getUserAvgGuesses, getUserGamesPlayed } from "../hooks/useSavestate";

export default function UserStats({}) {
  const userAvgGuesses = getUserAvgGuesses();
  const userGames = getUserGamesPlayed();
  return (
    <Card className="w-full max-w-sm bg-transparent">
      <CardHeader>
        <CardTitle>Game Statistics</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <div className="flex flex-row items-center gap-4">
          <div className="grid gap-0.5">
            <Label className="text-sm" htmlFor="games">
              Games
            </Label>
            <div className="text-2xl font-bold">{userGames}</div>
          </div>
        </div>
        <div className="flex flex-row items-center gap-4">
          <div className="grid gap-0.5">
            <Label className="text-sm" htmlFor="average">
              Avg. Guesses
            </Label>
            <div className="text-2xl font-bold">
              {userAvgGuesses.toFixed(2)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
