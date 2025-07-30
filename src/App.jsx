import React, { useCallback, useEffect, useState } from "react";
import StatsDisplay from "./components/StatsDisplay";
import TypingArea from "./components/TypingArea";
import RestartButton from "./components/RestartButton";
import Spinner from "./components/Spinner";
import { useTypingGame, GameState } from "./hooks/useTypingGame";
import { fetchTypingText } from "./services/geminiService";
const App = () => {
  const [textToType, setTextToType] = useState("");
  const [loading, setLoading] = useState(true);

  const { gameState, typed, timer, wpm, accuracy, resetGame, totalErrors } =
    useTypingGame(textToType);

  const getNewText = useCallback(async () => {
    setLoading(true);
    try {
      const newText = await fetchTypingText();
      setTextToType(newText);
      resetGame(newText);
    } catch (error) {
      console.error("Failed to fetch new text:", error);
      const fallbackText =
        "The quick brown fox jumps over the lazy dog. This is a fallback text in case the API call fails.";
      setTextToType(fallbackText);
      resetGame(fallbackText);
    } finally {
      setLoading(false);
    }
  }, [resetGame]);

  useEffect(() => {
    getNewText();
  }, [getNewText]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 flex flex-col items-center justify-center p-4 md:p-8 transition-colors duration-300">
      <div className="w-full max-w-3xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-cyan-400">
            Typing Speed Test
          </h1>
          <p className="text-slate-400 mt-2">
            How fast can you type? The timer starts when you begin typing.
          </p>
        </header>

        <main className="bg-slate-800/50 rounded-lg shadow-xl shadow-cyan-500/20 p-6 md:p-8">
          <StatsDisplay wpm={wpm} accuracy={accuracy} timer={timer} />

          <div className="mt-6">
            {loading ? (
              <div className="h-[200px] flex items-center justify-center">
                <Spinner />
              </div>
            ) : (
              <TypingArea text={textToType} typed={typed} />
            )}
          </div>
          <div className="mt-6 space-y-6">
            {gameState === GameState.Finished && (
              <div className="text-center p-6 bg-slate-900 rounded-lg">
                <h2 className="text-2xl font-bold text-cyan-400">
                  Test Complete!
                </h2>
                <div className="flex justify-center space-x-8 mt-4">
                  <div>
                    <p className="text-slate-400">Final WPM</p>
                    <p className="text-4xl font-bold text-white">
                      {Math.round(wpm)}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400">Accuracy</p>
                    <p className="text-4xl font-bold text-white">
                      {accuracy.toFixed(1)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400">Errors</p>
                    <p className="text-4xl font-bold text-white">
                      {totalErrors}
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div className="flex justify-center">
              <RestartButton onClick={getNewText} disabled={loading} />
            </div>
          </div>
        </main>

        <footer className="text-center mt-8 text-slate-500 text-sm space-y-2">
          <p>Powered by React, Tailwind CSS and Google Gemini</p>
          <div className="flex items-center justify-center space-x-4">
            <a
              href="https://github.com/sainath-666"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              GitHub
            </a>
            <span>•</span>
            <a
              href="https://linkedin.com/in/sainath666"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              LinkedIn
            </a>
          </div>
          <p>
            © {new Date().getFullYear()} Built with ❤️ by{" "}
            <a
              href="https://wa.link/ht3rv4"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              Sainathreddy
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
