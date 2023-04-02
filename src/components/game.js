import { useGameContext } from '@/hooks/game-context';
import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader, Stats } from '@react-three/drei';
import World from '@/components/world';
import Player from '@/components/player';
import MovingItem from '@/components/movingItem';
import Score from '@/components/score';
import StartScreen from '@/components/start-screen';
import GameoverScreen from '@/components/gameover-screen';
import PausedScreen from '@/components/paused-screen';

const Game = () => {
  const { setScore, setIsPaused, setIsPlaying, setGameOver } = useGameContext();
  const [isFocused, setIsFocused] = useState(true);
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

  useEffect(() => {
    window.addEventListener('focus', () => setIsFocused(true));
    window.addEventListener('blur', () => setIsFocused(false));

    return () => {
      window.removeEventListener('focus', () => setIsFocused(true));
      window.addEventListener('blur', () => setIsFocused(false));
    };
  });

  useEffect(() => {
    if (!isFocused) setIsPaused(true);
  }, [isFocused, setIsPaused]);

  return (
    <div className={`
      md:flex h-full items-center justify-center
      bg-gradient-to-b from-blue-400 to-amber-100
    `}>
      <PausedScreen />
      <GameoverScreen resetGame={resetGame} />
      <StartScreen resetGame={resetGame} />
      <Canvas
        shadows
        camera={{
          position: [-8, 2, -8],
          fov: 50,
          far: 1000
        }}
      >
        {/*<Stats />*/}
        <Score />
        <MovingItem setMovingItem={setMovingItem} player={player}>
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
          <Player setPlayer={setPlayer} />
          <World player={player} />
        </Suspense>
      </Canvas>
      <Loader />
    </div>
  );
};

export default Game;
