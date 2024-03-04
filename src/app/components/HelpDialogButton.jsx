import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { HelpCircle } from "lucide-react";

export default function HelpDialogButton({}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <HelpCircle className="mr-2 h-4 w-4" />
          <span className="max-md:hidden">Help</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md flex flex-col">
        <DialogHeader>
          <DialogTitle>How to play</DialogTitle>
          <DialogDescription>
            A basic into the world of unnamed word game.
          </DialogDescription>
        </DialogHeader>
        <p>
          Given synonyms (and sometimes related words), guess the root word.
          Each wrong guess unlocks a new hint. Try to get it in as few guesses
          as possible!
        </p>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
