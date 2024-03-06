import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function WordInput({
  length,
  value,
  onChange,
  onSubmit,
  firstLetter,
  disabled = false,
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
    animate: (i) => ({
      y: [0, -15, 0],
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
    initial: { y: 0 },
  };

  return (
    <div className="flex w-full justify-center">
      {Array.from({ length }).map((_, index) => (
        <motion.input
          key={index}
          variants={variants}
          animate={disabled ? "animate" : "initial"}
          custom={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          disabled={disabled}
          value={value[index] || ""}
          onChange={(e) => handleInputChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          placeholder={index === 0 && firstLetter ? firstLetter : ""}
          className={`flex-1 text-center border-2  ${
            disabled ? "bg-lime-200 border-lime-400" : "bg-input border-border"
          } rounded-md m-1 max-w-14 text-2xl`}
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
