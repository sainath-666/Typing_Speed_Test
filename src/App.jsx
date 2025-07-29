import React, { useCallback, useEffect, useState } from "react";
import StatsDisplay from "./components/StatsDisplay";
import TypingArea from "./components/TypingArea";
import RestartButton from "./components/RestartButton";
import Spinner from "./components/Spinner";
import { useTypingGame } from "./hooks/useTypingGame";
import { fetchTypingText } from "./services/geminiService";
const App = () => {

const [textToType, setTextToType]= useState('');
  const [loading, setLoading] = useState(true);

  const {
    gameState,
    typed,
    timer,
    wpm,
    accuracy,
    resetGame,
    totalErrors,
  } = useTypingGame(textToType);


  const getNewText = useCallback(async () => {
    setLoading(true);
    try{
      const newText =await fetchTypingText();
      setTextToType(newText);
      resetGame(newText);

    } catch (error) {
      console.error("Failed to fetch new text:", error);
      const fallbackText = "The quick brown fox jumps over the lazy dog. This is a fallback text in case the API call fails.";
      setTextToType(fallbackText);
      resetGame(fallbackText);
    } finally {
      setLoading(false);
    }
  },[resetGame]);

  useEffect(()=>{
    getNewText();
  },[]);



  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 flex flex-col items-center justify-center p-4 md:p-8 transition-colors duration-300 ">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 ">
            Typing Speed Text
          </h1>
          <p className="text-slate-400 mt-2">
            How fast can you type? The timer starts when you begin typing.
          </p>
        </header>

        <main className="bg-slate-800/50 rounded-lg shadow-2xl shadow-cyan-500/50 p-6 md:p-8 ">
          <StatsDisplay wpm={wpm} accuracy={accuracy} timer={timer} />

          <div>
            {loading ? (
              <div className="h-48 flex items-center justify-center">
                <Spinner />
              </div>
            ) : (
              <TypingArea text={"Sainathreddy"} typed={"Sann"} />
            )}
          </div>
        </main>

        <footer className="text-center mt-8 text-slate-500 text-sm">
          <p>Powered by React, Tailwind CSS and Google Gemini</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
