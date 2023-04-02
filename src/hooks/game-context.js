import { createContext, useState, useContext } from 'react';

const GameContext = createContext({});

export const GameProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [player, setPlayer] = useState(null);
  const [movingItem, setMovingItem] = useState(null);

  const resetGame = () => {
    movingItem.current.position.z = -30;
    player.current.position.y = 0;
    setScore(0);
    setIsPlaying(true);
    setIsPaused(false);
    setGameOver(false);
  };

  return (
    <GameContext.Provider
      value={{
        score,
        setScore,
        isPlaying,
        setIsPlaying,
        isPaused,
        setIsPaused,
        gameOver,
        setGameOver,
        player,
        setPlayer,
        movingItem,
        setMovingItem,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};


export const useGameContext = () => useContext(GameContext);
