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

export default function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="md:hidden" variant="ghost">
          <Menu className="mr-2 h-4 w-4" />
          Menu
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="text-left text-2xl tracking-tight font-serif font-normal">
            Relatle
          </SheetTitle>
          <SheetDescription className="text-left min-w-0 -mt-1">
            The daily synonym word game.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col items-start gap-4 py-4 flex-1">
          <Button variant="ghost" disabled>
            <History className="mr-2 h-4 w-4" />
            Archive
          </Button>
          <Button asChild variant="ghost">
            <a href="https://www.buymeacoffee.com/hexcodle">
              <Coffee className="mr-2 h-4 w-4" />
              Coffee
            </a>
          </Button>
          <SettingsDialogButton />
          <HelpDialogButton />
        </div>
        <SheetFooter className="fixed bottom-4">
          {/*<p>Contact: slime@gmail.com</p>*/}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
