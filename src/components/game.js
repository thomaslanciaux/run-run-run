import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/router';
import { useGameContext } from '@/hooks/game-context';
import { Canvas } from '@react-three/fiber';
import { Loader, Stats } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import World from '@/components/world';
import Player from '@/components/player';
import Score from '@/components/score';
import StartScreen from '@/components/start-screen';
import GameoverScreen from '@/components/gameover-screen';
import PausedScreen from '@/components/paused-screen';
import Colliders from '@/components/colliders';
import CheckColliders from '@/components/check-colliders';

const Game = () => {
  const router = useRouter();
  const { setScore, setIsPaused, setIsPlaying, setGameOver } = useGameContext();
  const [isFocused, setIsFocused] = useState(true);
  const [player, setPlayer] = useState(null);
  const [colliders, setColliders] = useState([]);

  const resetGame = () => {
    setScore(0);
    setIsPlaying(true);
    setIsPaused(false);
    setGameOver(false);
    for (let i = 0; i < colliders.length; i++) {
      colliders[i].current.position.z = 30 + (i * 10);
    }
    if (player && player.current) player.current.position.y = 0;
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
      flex h-full items-center justify-center
      bg-gradient-to-b from-blue-400 to-amber-100
    `}>
      <PausedScreen />
      <GameoverScreen resetGame={resetGame} />
      <StartScreen resetGame={resetGame} />
      <Canvas
        gl={{ antialias: true }}
        shadows
        camera={{
          position: [-12, 3, -6],
          fov: 50,
          far: 1000
        }}
      >
        {router.query.debug && (
          <>
            <Stats showPanel={2} />
            <Perf position="bottom-right" />
          </>
        )}
          <Suspense fallback={null}>
            <Colliders setColliders={setColliders} />
            <CheckColliders colliders={colliders} player={player} />
            <Player setPlayer={setPlayer} />
            <World />
            <Score />
          </Suspense>
      </Canvas>
      <Loader />
    </div>
  );
};

export default Game;
