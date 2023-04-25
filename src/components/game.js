import { useState, useEffect, Suspense, useRef } from 'react';
import { useRouter } from 'next/router';
import { useGameContext } from '@/hooks/game-context';
import { Canvas } from '@react-three/fiber';
import {
  AdaptiveDpr,
  AdaptiveEvents,
  OrbitControls,
  PerformanceMonitor,
  Stats,
} from '@react-three/drei';
import { Perf } from 'r3f-perf';
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
    gameOver,
    isPlaying,
  } = useGameContext();

  const score = useRef(0);
  const acceleration = useRef(0);

  const [isFocused, setIsFocused] = useState(true);
  const [player, setPlayer] = useState(null);
  const [colliders, setColliders] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dpr, setDpr] = useState(2);
  const router = useRouter();

  const resetGame = () => {
    score.current = 0;
    acceleration.current = 0;
    setIsPlaying(true);
    setIsPaused(false);
    setGameOver(false);
    if (!obstacles.length) return;
    for (let i = 0; i < colliders.length; i++) {
      colliders[i].current.position.z = obstacles[i].positionZ;
    }
    if (player && player.current) player.current.position.y = 0;
  };

  useEffect(() => {
    if (player && player.current) setIsLoaded(true);
  }, [player]);

  useEffect(() => {
    window.addEventListener('focus', () => setIsFocused(true));
    window.addEventListener('blur', () => setIsFocused(false));

    return () => {
      window.removeEventListener('focus', () => setIsFocused(true));
      window.removeEventListener('blur', () => setIsFocused(false));
    };
  });

  useEffect(() => {
    if (!isFocused) setIsPaused(true);
  }, [isFocused, setIsPaused]);

  return (
    <div className={`
      flex h-full items-center justify-center bg-gradient-to-b from-blue-400 to-blue-500
    `}>
      <PausedScreen />
      {gameOver && <GameoverScreen resetGame={resetGame} score={score} />}
      {!isPlaying && <StartScreen resetGame={resetGame} isLoaded={isLoaded} />}
      <Canvas
        flat
        dpr={dpr}
        gl={{
          antialias: false,
          physicallyCorrectLight: true,
        }}
        shadows
        camera={{
          position: [-12, 3, -6],
          fov: 50,
          far: 500
        }}
      >
        <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1)} />
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        {router.query.debug && (
          <>
            <OrbitControls />
            <Stats showPanel={2} />
            <Perf position="bottom-left" antialias={false} />
          </>
        )}
          <Suspense fallback={null}>
            <Player setPlayer={setPlayer} acceleration={acceleration} />
            <CheckColliders colliders={colliders} player={player} debug={router.query.debug === 'true'} />
            <Colliders setColliders={setColliders} obstacles={obstacles} acceleration={acceleration} />
            <World acceleration={acceleration} />
          </Suspense>
          <Score score={score} />
      </Canvas>
    </div>
  );
};

export default Game;
