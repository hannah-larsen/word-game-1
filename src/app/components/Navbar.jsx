import HelpDialogButton from "./HelpDialogButton";
import SettingsDialogButton from "./SettingsDialogButton";
import MobileMenuSheet from "./MobileMenuSheet";
import { Button } from "./ui/button";
import { Coffee, History } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="text-black w-full flex items-center justify-center">
      <div className="flex justify-between items-center w-full py-3 px-2 max-w-3xl">
        <div className="flex flex-1">
          <MobileMenuSheet />
          <Button className="max-md:hidden" variant="ghost">
            <Link
              href={`/archive`}
              className="flex items-center justify-center"
              tabIndex={-1}
            >
              <History className="mr-2 h-4 w-4" />
              Archive
            </Link>
          </Button>
        </div>
        <div className="text-center">
          <a href="/" className="text-center">
            <h1 className="text-2xl tracking-tight font-serif font-medium">
              Relatle
            </h1>
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
