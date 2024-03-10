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
          Help
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md flex flex-col">
        <DialogHeader>
          <DialogTitle>How to play</DialogTitle>
          <DialogDescription>
            Can you identify the word in the fewest guesses?
          </DialogDescription>
        </DialogHeader>
        <p>
          Synonyms and related words will pop up on the screen. Try to guess the
          correct word in the fewest number of tries!
        </p>
        <p>
          After each failed attempt to guess the correct word, a new
          synonym/related word will appear.
        </p>
        <p>You can reveal the first letter if you need a hint.</p>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
