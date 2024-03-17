import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function WordInput({
  length,
  value,
  onChange,
  onSubmit,
  firstLetter,
  gameState = "ongoing",
}) {
  const inputRefs = useRef(new Array(length).fill(null));

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  // Automatically focus the leftmost empty input whenever 'value' changes
  useEffect(() => {
    const nextIndex = value.length < length ? value.length : length - 1;
    inputRefs.current[nextIndex].focus();
  }, [value, length]);

  const handleInputChange = (e, index) => {
    const newValue = e.target.value.toUpperCase();

    if (!newValue.match(/[A-Z]/) && newValue !== "") {
      return; // Ignore non-letter inputs and ensure uppercase
    }

    const newWordArray = value.split("");
    // Replace the value at the current index, or add a new character if possible
    if (index < length) {
      newWordArray[index] = newValue;
    }
    const newWord = newWordArray.join("");
    onChange(newWord);
  };

  const handleKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      (value[index] === "" || index === value.length)
    ) {
      // Prevent the default backspace behavior to avoid navigating back
      e.preventDefault();

      // Delete the character in the previous box if it exists
      if (index > 0) {
        const newWordArray = value.split("");
        newWordArray[index - 1] = ""; // Clear the character at the previous index
        onChange(newWordArray.join(""));
        inputRefs.current[index - 1].focus(); // Move focus to the previous input
      }
    } else if (e.key === "Enter") {
      onSubmit();
    }
  };

  const variants = {
    jump: (i) => ({
      y: [0, -15, 0],
      transition: {
        type: "tween",
        delay: i * 0.08,
        duration: 0.4,
      },
    }),
    initial: { y: 0 },
    shake: {
      x: [0, -10, 10, -10, 10, 0],
      transition: { type: "tween", duration: 0.5 },
    },
  };

  function getAnimationState(gameState) {
    if (gameState === "lose") {
      return "shake";
    } else if (gameState === "win") {
      return "jump";
    } else {
      return "initial";
    }
  }

  return (
    <div className="flex w-full justify-center px-4">
      {Array.from({ length }).map((_, index) => (
        <motion.input
          key={index}
          variants={variants}
          animate={getAnimationState(gameState)}
          custom={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          disabled={gameState !== "ongoing"}
          value={value[index] || ""}
          onChange={(e) => handleInputChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          placeholder={index === 0 && firstLetter ? firstLetter : ""}
          className={`flex-1 text-center border-2 m-1 max-sm:m-0.5
            ${gameState === "win" && "bg-lime-200 border-lime-400"}
            ${gameState === "lose" && "bg-red-200 border-red-400"}
            ${gameState === "ongoing" && "bg-input border-border"}
           rounded-md max-w-14 text-2xl max-md:text-xl`}
          style={{
            minWidth: "0",
            aspectRatio: "1 / 1",
            textTransform: "uppercase",
          }}
          maxLength="1"
        />
      ))}
    </div>
  );
}
