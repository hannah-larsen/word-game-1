import { Suspense } from "react";
import { getGameNumber } from "../utils/manageTime";
import { cookies } from "next/headers";
import { Button } from "../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import Link from "next/link";

export default async function Page() {
  const cookieStore = cookies();
  const number = getGameNumber();

  return (
    <Suspense>
      <div className="max-w-3xl p-4">
        <Card className="mb-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base p-0">README.md</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              This page is a WIP. Try extra auto-generated puzzles at negative
              number archives just like hexcodle. Some auto-generated words may
              be offensive or nonsensical.
            </p>
          </CardContent>
        </Card>
        <div className="flex flex-col items-center">
          {Array.from({ length: number }, (_, i) => (
            <Button variant="link" key={i} className="w-min" asChild>
              <Link href={`/archive/${i + 1}`}>{`Relatle ${i + 1}`}</Link>
            </Button>
          ))}
        </div>
      </div>
    </Suspense>
  );
}
