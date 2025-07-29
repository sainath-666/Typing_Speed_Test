import React from "react";

type CharacterProps = {
  char: string;
  state: "correct" | "incorrect" | "untyped" | "cursor";
};

const Character = React.memo(({ char, state }: CharacterProps) => {
  let className = "transition-colors duration-200 ease-in-out ";
  let characterToDisplay = char;

  switch (state) {
    case "correct":
      className += "text-green-400";
      break;
    case "incorrect":
      className += "text-red-400 bg-red-500/20 rounded-sm";
      if (char === " ") {
        characterToDisplay = "_";
      }
      break;
    case "untyped":
      className += "text-slate-500";
      break;
    case "cursor":
      className += "text-slate-300 bg-cyan-500/50 rounded-sm animate-pulse";
      break;
  }

  return <span className={className}>{characterToDisplay}</span>;
});

function TypingArea({ text, typed }) {
  const characters = React.useMemo(() => {
    return text.split("").map((char, index) => {
      let state: "correct" | "incorrect" | "untyped" | "cursor" = "untyped";
      if (index < typed.length) {
        state = typed[index] === char ? "correct" : "incorrect";
      } else if (index === typed.length) {
        state = "cursor";
      }
      return <Character key={`${char}-${index}`} char={char} state={state} />;
    });
  }, [text, typed]);

  return (
    <div
      className="text-2xl leading-relaxed tracking-wider bg-slate-900/70 p-4 rounded-md focus:outline-none select-none"
      tabIndex={0}
    >
      {characters}
    </div>
  );
}

export default TypingArea;
