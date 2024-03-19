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
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { UserCircle } from "lucide-react";
import { useState } from "react";
import { clearSaveData } from "../hooks/useSavestate";
import { useRouter } from "next/navigation";

export default function SettingsDialogButton({ className }) {
  const [destructInput, setDestructInput] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const router = useRouter();

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
        <p>This action is permenant. Make sure you&apos;re super sure!</p>
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
          disabled={destructInput.toLowerCase() !== "tabula rasa"}
          onClick={() => {
            setResetLoading(true);
            clearSaveData();
            window.location.reload(true);
          }}
        >
          {resetLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Erase my savefile
        </Button>
        {/*<DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
  </DialogFooter>*/}
      </DialogContent>
    </Dialog>
  );
}
