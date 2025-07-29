import { useState, useEffect, useCallback, useRef } from 'react';

// In JavaScript, we define the equivalent of an enum as a constant object.
const GameState = {
  Waiting: 'Waiting',
  Running: 'Running',
  Finished: 'Finished',
};

const TEST_DURATION = 100; // 100 seconds

export const useTypingGame = (textToType) => {
  const [gameState, setGameState] = useState(GameState.Waiting);
  const [timer, setTimer] = useState(TEST_DURATION);
  const [typed, setTyped] = useState('');
  const [totalErrors, setTotalErrors] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  const timerIntervalRef = useRef(null);
  const startTimeRef = useRef(null);

  const calculateStats = useCallback((currentTime) => {
    if (!startTimeRef.current) return; // Don't calculate if timer hasn't started

    const timeElapsedSeconds = (currentTime - startTimeRef.current) / 1000;
    if (timeElapsedSeconds <= 0) return;

    const wordsTyped = (typed.length / 5);
    const timeElapsedMinutes = timeElapsedSeconds / 60;
    const currentWpm = wordsTyped / timeElapsedMinutes;
    setWpm(currentWpm);

    const newErrors = typed.split('').reduce((acc, char, index) => {
      return textToType[index] !== char ? acc + 1 : acc;
    }, 0);
    setTotalErrors(newErrors);

    const correctChars = typed.length - newErrors;
    const currentAccuracy = typed.length > 0 ? (correctChars / typed.length) * 100 : 100;
    setAccuracy(currentAccuracy);

  }, [typed, textToType]);

  const startTimer = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    startTimeRef.current = Date.now();
    setGameState(GameState.Running);

    timerIntervalRef.current = window.setInterval(() => {
      if (!startTimeRef.current) return;
      const now = Date.now();
      const elapsed = Math.floor((now - startTimeRef.current) / 1000);
      const remaining = TEST_DURATION - elapsed;
      
      setTimer(remaining > 0 ? remaining : 0);
      
      if (remaining <= 0) {
        setGameState(GameState.Finished);
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      }
    }, 1000);
  }, [setGameState]);
  
  // Note: The 'newText' parameter from the original code is not used in the function body.
  const resetGame = useCallback((newText) => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setGameState(GameState.Waiting);
    setTimer(TEST_DURATION);
    setTyped('');
    setWpm(0);
    setAccuracy(100);
    setTotalErrors(0);
    startTimeRef.current = null;
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (gameState === GameState.Finished) return;

    const { key } = e;

    if (gameState === GameState.Waiting && key.length === 1 && !e.ctrlKey && !e.metaKey) {
      startTimer();
    }
    
    if (key === 'Backspace') {
      e.preventDefault();
      setTyped(prev => prev.slice(0, -1));
    } else if (key.length === 1 && !e.ctrlKey && !e.metaKey) { // Handle single character keys
      e.preventDefault();
      setTyped(prev => {
        if (prev.length < textToType.length) {
          return prev + key;
        }
        return prev;
      });
    }

  }, [gameState, textToType.length, startTimer]);


  useEffect(() => {
    if (gameState === GameState.Running) {
      calculateStats(Date.now());
      if (typed.length === textToType.length) {
          setGameState(GameState.Finished);
          if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      }
    }
  }, [typed, textToType, gameState, calculateStats]);


  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Ensure interval is cleared on component unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  return { gameState, typed, timer, wpm, accuracy, totalErrors, resetGame };
};