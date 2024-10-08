import { useEffect, Suspense, useRef } from 'react';
import { useGameContext } from '@/hooks/game-context';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, AdaptiveEvents, Stats, Loader } from '@react-three/drei';
import World from '@/components/world';
import Player from '@/components/player';
import Score from '@/components/score';
import StartScreen from '@/components/start-screen';
import GameoverScreen from '@/components/gameover-screen';
import PausedScreen from '@/components/paused-screen';
import Colliders from '@/components/colliders';
import CheckColliders from '@/components/check-colliders';
import { generateObstacles } from '@/libs/utils';

const obstacles = generateObstacles();

const Game = () => {
  const {
    setIsPaused,
    setIsPlaying,
    setGameOver,
    colliders,
  } = useGameContext();

  const score = useRef(0);
  const acceleration = useRef(0);
  const player = useRef(null)

  const resetGame = () => {
    score.current = 0;
    acceleration.current = 0;
    setIsPlaying(true);
    setGameOver(false);
    setIsPaused(false);
    if (!colliders.length) return;
    for (let i = 0; i < colliders.length; i++) {
      colliders[i].current.position.z = obstacles[i].positionZ;
    }
  };

  useEffect(() => {
    window.addEventListener('blur', () => setIsPaused(true));
    return () => {
      window.removeEventListener('blur', () => setIsPaused(true));
    };
  });

  return (
    <div className={`
      flex h-full items-center justify-center bg-gradient-to-b from-blue-400 to-blue-500
    `}>
      <PausedScreen />
      <GameoverScreen resetGame={resetGame} score={score} />
      <StartScreen resetGame={resetGame} player={player} />
      <Canvas
        gl={{
          antialiased: false,
        }}
        shadows
        camera={{
          position: [-12, 3, -4],
          fov: 50,
          far: 300
        }}
      >
        <AdaptiveDpr />
        <Suspense fallback={null}>
          <Player acceleration={acceleration} ref={player} />
          <CheckColliders player={player} />
          <Colliders obstacles={obstacles} acceleration={acceleration} />
          <World acceleration={acceleration} />
          <Score score={score} />
        </Suspense>
      </Canvas>
      <Loader />
    </div>
  );
};

export default Game;
