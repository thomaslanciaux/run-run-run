import { createContext, useState, useContext } from 'react';

const GameContext = createContext({});

export const GameProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [acceleration, setAcceleration] = useState(0);

  return (
    <GameContext.Provider
      value={{
        acceleration,
        setAcceleration,
        score, 
        setScore,
        isPlaying,
        setIsPlaying,
        isPaused,
        setIsPaused,
        gameOver,
        setGameOver,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};


export const useGameContext = () => useContext(GameContext);
