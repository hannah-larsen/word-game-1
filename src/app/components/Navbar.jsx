import HelpDialogButton from "./HelpDialogButton";
import SettingsDialogButton from "./SettingsDialogButton";
import MobileMenuSheet from "./MobileMenuSheet";
import { Button } from "./ui/button";
import { Coffee, History } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="text-black w-full flex items-center justify-center">
      <div className="flex justify-between items-center w-full py-3 px-2 max-w-3xl">
        <div className="flex flex-1">
          <Button className="max-md:hidden" variant="ghost" disabled>
            <History className="mr-2 h-4 w-4" />
            Archive
          </Button>
          <Button className="max-md:hidden" asChild variant="ghost">
            <a href="https://www.buymeacoffee.com/hexcodle">
              <Coffee className="mr-2 h-4 w-4" />
              Coffee
            </a>
          </Button>
          <MobileMenuSheet />
        </div>
        <div className="text-center">
          <a href="/" className="text-center">
            <h1 className="text-2xl tracking-tight font-serif">Relatle</h1>
            <p className="text-xs text-muted-foreground min-w-0 -mt-1 max-md:hidden">
              The daily synonym word game.
            </p>
          </a>
        </div>
        <div className="flex flex-1 justify-end">
          <HelpDialogButton />
          <SettingsDialogButton className="max-md:hidden" />
        </div>
      </div>
    </nav>
  );
}
