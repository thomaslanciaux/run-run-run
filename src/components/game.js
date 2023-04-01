import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader, Stats } from '@react-three/drei';
import World from '@/components/world';
import Player from '@/components/player';
import MovingItem from '@/components/movingItem';
import Screen from '@/components/screen';
import GameState from '@/components/game-state';
import GameoverScreen from '@/components/gameover-screen';
import PausedScreen from '@/components/paused-screen';

const Game = () => {
  const [score, setScore] = useState(0);
  const [player, setPlayer] = useState(null);
  const [movingItem, setMovingItem] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isFocused, setIsFocused] = useState(true);

  useEffect(() => {
    window.addEventListener('focus', () => setIsFocused(true));
    window.addEventListener('blur', () => setIsFocused(false));

    return () => {
      window.removeEventListener('focus', () => setIsFocused(true));
      window.addEventListener('blur', () => setIsFocused(false));
    };
  });

  const resetGame = () => {
    movingItem.current.position.z = -30;
    player.current.position.y = 0;
    setScore(0);
    setIsPlaying(true);
    setIsPaused(false);
    setGameOver(false);
  };

  useEffect(() => {
    if (gameOver) {
      movingItem.current.position.z = -30;
    }
  }, [gameOver, movingItem]);

  useEffect(() => {
    if (!isFocused) setIsPaused(true);
  }, [isFocused]);

  return (
    <div className={`
      md:flex h-full items-center justify-center
      bg-gradient-to-b from-blue-400 to-amber-100
    `}>
      {isPaused && !gameOver && (
        <PausedScreen setIsPaused={setIsPaused} />
      )}
      {gameOver && (
        <GameoverScreen
          resetGame={resetGame}
          score={score}
          isPaused={isPaused}
        />
      )}
      {!isPlaying && (
        <Screen resetGame={resetGame} isPaused={isPaused} />
      )}
      {!gameOver && (
        <div className="
          absolute bottom-0 right-0 p-4 text-orange-500 font-bold text-2xl flex items-center justify-center
        ">
          {score}
        </div>
      )}
      <Canvas
        shadows
        camera={{ position: [-8, 2, -8], fov: 50 }}
      >
        {/*<Stats />*/}
        <ambientLight intensity={0.5} />
        <GameState
          score={score}
          setScore={setScore}
          gameOver={gameOver}
          isPlaying={isPlaying}
          isPaused={isPaused}
        />
        <MovingItem
          player={player}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          setGameOver={setGameOver}
          setMovingItem={setMovingItem}
          gameOver={gameOver}
          isPaused={isPaused}
        >
          <mesh
            castShadow
            receiveShadow 
            position={[0, 0.5, 0]}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              roughness={0.2}
              metalness={1}
              color="gold"
            />
          </mesh>
        </MovingItem>
        <Suspense fallback={null}>
          <Player
            setPlayer={setPlayer}
            isPlaying={isPlaying}
            isPaused={isPaused}
            gameOver={gameOver}
          />
          <World />
        </Suspense>
      </Canvas>
      <Loader />
    </div>
  );
};

export default Game;
