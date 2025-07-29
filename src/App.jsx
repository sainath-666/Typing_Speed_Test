import React from "react";
import StatsDisplay from "./components/StatsDisplay";
import TypingArea from "./components/TypingArea";
import RestartButton from "./components/RestartButton";

const App = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 flex flex-col items-center justify-center p-4 md:p-8 transition-colors duration-300 ">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 ">Typing Speed Text</h1>
          <p className="text-slate-400 mt-2">How fast can you type? The timer starts when you begin typing.</p>
        </header>

        <main className="bg-slate-800/50 rounded-lg shadow-2xl shadow-cyan-500/50 p-6 md:p-8 ">
          <StatsDisplay />
          <TypingArea text={"sa"}  typed={"sai"}/>

          <RestartButton />
          
        </main>

        <footer className="text-center mt-8 text-slate-500 text-sm">
          <p>Powered by React, Tailwind CSS and Google Gemini</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
