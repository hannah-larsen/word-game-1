import HelpDialogButton from "./HelpDialogButton";
import SettingsDialogButton from "./SettingsDialogButton";
import { Button } from "./ui/button";
import { Coffee, History } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="text-black w-full flex items-center justify-center">
      <div className="flex justify-between items-center w-full py-3 px-2 max-w-3xl">
        <div className="flex flex-1">
          <Button variant="ghost">
            <History className="mr-2 h-4 w-4" />
            <span className="max-md:hidden">Archive</span>
          </Button>
          <Button variant="ghost">
            <Coffee className="mr-2 h-4 w-4" />{" "}
            <span className="max-md:hidden">Coffee</span>
          </Button>
        </div>
        <div className="text-center">
          <a href="/" className="text-center">
            <span className="font-semibold text-xl tracking-tight">
              Unnamed Word Game
            </span>
          </a>
        </div>
        <div className="flex flex-1 justify-end">
          <HelpDialogButton />
          <SettingsDialogButton />
        </div>
      </div>
    </nav>
  );
}
