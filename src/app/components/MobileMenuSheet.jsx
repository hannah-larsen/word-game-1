import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "./ui/sheet";
import { Menu } from "lucide-react";
import { Coffee, History } from "lucide-react";
import SettingsDialogButton from "./SettingsDialogButton";
import HelpDialogButton from "./HelpDialogButton";
import UserStats from "./UserStats";
import Link from "next/link";

export default function MobileMenuSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="relative">
          <Menu className="mr-2 h-4 w-4" />
          Menu
          <div className="absolute top-0 right-0 h-2 w-2 bg-blue-500 rounded-full" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader className="mb-2">
          <SheetTitle className="text-left text-2xl tracking-tight font-serif font-normal -mb-2">
            Relatle
          </SheetTitle>
          <SheetDescription className="text-left min-w-0">
            The daily synonym word game.
          </SheetDescription>
        </SheetHeader>
        <UserStats />
        <div className="flex flex-col items-start gap-4 py-4 flex-1 md:hidden">
          <Button variant="ghost" asChild>
            <a href={`/archive`}>
              <History className="mr-2 h-4 w-4" />
              Archive
            </a>
          </Button>
          <SettingsDialogButton />
          <HelpDialogButton />
        </div>
        <div className="flex flex-col items-start gap-4 py-4 flex-1">
          <h2 className="font-medium">Check out our other links</h2>
          <Button asChild variant="ghost">
            <a href="https://www.hexcodle.com">
              <img
                src="https://www.hexcodle.com/favicon.ico"
                className="mr-2 h-4 w-4"
              />
              Hexcodle
            </a>
          </Button>
          <Button asChild variant="ghost">
            <a href="https://www.relatle.lol">
              <img
                src="https://www.relatle.lol/favicon.ico"
                className="mr-2 h-4 w-4"
              />
              Relatle
            </a>
          </Button>
          <Button asChild variant="ghost">
            <a href="https://www.buymeacoffee.com/hexcodle">
              <Coffee className="mr-2 h-4 w-4" />
              Donate
            </a>
          </Button>
        </div>
        <SheetFooter className="fixed bottom-4">
          {/*<p>Contact: slime@gmail.com</p>*/}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
