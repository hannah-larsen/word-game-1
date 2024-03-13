"use client";

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
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { UserCircle } from "lucide-react";
import { useState } from "react";
import { clearSaveData } from "../hooks/useSavestate";

export default function SettingsDialogButton({ className }) {
  const [destructInput, setDestructInput] = useState("");

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
        <p>More settings coming soon!</p>
        <h2 className="font-semibold -mb-4">Clear Progress</h2>
        <p>
          This action is permenant. A refresh may be needed to see changes after
          erasing.
        </p>
        <Label htmlFor="delete-progress-input">
          Type &quot;tabula rasa&quot; to confirm
        </Label>
        <Input
          className="border-border"
          id="delete-progress-input"
          value={destructInput}
          onChange={(e) => setDestructInput(e.target.value)}
        />
        <Button
          variant="destructive"
          disabled={destructInput !== "tabula rasa"}
          onClick={() => clearSaveData()}
        >
          Erase my savefile
        </Button>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
