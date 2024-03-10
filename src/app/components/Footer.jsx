import { Button } from "./ui/button";

export default function Footer({}) {
  return (
    <footer className="text-black w-full">
      <div className="flex justify-center items-center w-full py-2">
        <div>
          <Button
            className="max-md:hidden font-light text-xs text-muted-foreground underline-offset-1 decoration-current"
            asChild
            variant="link"
          >
            <a target="_blank" href="https://forms.gle/xp5rs1p8soSAxQCW7">
              Feedback Form
            </a>
          </Button>
        </div>
        <span className="font-light text-xs text-muted-foreground">
          Made by Ekim and Hannah with 🤎
        </span>
      </div>
    </footer>
  );
}
