import React from "react";

const Character = React.memo(({ char, state }) => {
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
      let state = "untyped";
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
      className="text-lg md:text-xl font-mono leading-relaxed tracking-wide bg-slate-900/70 p-6 rounded-md focus:outline-none select-none min-h-[200px] flex items-center"
      tabIndex={0}
    >
      <div className="max-w-2xl mx-auto">{characters}</div>
    </div>
  );
}

export default TypingArea;
