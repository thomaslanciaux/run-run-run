import { useEffect, Suspense, useRef } from 'react';
import { useRouter } from 'next/router';
import { useGameContext } from '@/hooks/game-context';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, AdaptiveEvents, OrbitControls, } from '@react-three/drei';
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
    setPlayer,
    colliders,
    setColliders,
  } = useGameContext();

  const score = useRef(0);
  const acceleration = useRef(0);
  const router = useRouter();

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
    window.addEventListener('blur', () => !router.query.debug && setIsPaused(true));
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
      <StartScreen resetGame={resetGame} />
      <Canvas
        flat
        gl={{
          antialias: false,
        }}
        shadows
        camera={{
          position: [-12, 3, -6],
          fov: 50,
          far: 300
        }}
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        {router.query.debug && (
          <>
            <OrbitControls />
            <Perf position="bottom-left" antialias={false} />
          </>
        )}
        <Suspense fallback={null}>
          <Player setPlayer={setPlayer} acceleration={acceleration} />
          <CheckColliders debug={router.query.debug === 'true'} />
          <Colliders
            setColliders={setColliders}
            obstacles={obstacles}
            acceleration={acceleration}
          />
          <World acceleration={acceleration} />
          <Score score={score} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Game;
