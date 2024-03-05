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
import { UserCircle } from "lucide-react";

export default function SettingsDialogButton({ className }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className={className}>
          <UserCircle className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md flex flex-col">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Your changes will be saved automatically.
          </DialogDescription>
        </DialogHeader>
        <p>Coming soon!</p>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
