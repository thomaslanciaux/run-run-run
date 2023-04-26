import { createContext, useState, useContext } from 'react';

const GameContext = createContext({});

export const GameProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [player, setPlayer] = useState();
  const [colliders, setColliders] = useState([]);

  return (
    <GameContext.Provider
      value={{
        isPlaying,
        setIsPlaying,
        isPaused,
        setIsPaused,
        gameOver,
        setGameOver,
        player,
        setPlayer,
        colliders,
        setColliders,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};


export const useGameContext = () => useContext(GameContext);
