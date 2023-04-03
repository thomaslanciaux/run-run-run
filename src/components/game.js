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
import CheckColliders from '@/components/check-colliders';
import { useRouter } from 'next/router';

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
    colliders.forEach((collider, index) => {
      collider.current.position.z = 30 - (index * 10);
    });
    player.current.position.y = 0;
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
        shadows
        camera={{
          position: [-12, 3, -6],
          fov: 50,
          far: 1000
        }}
      >
        {router.query.debug && (
          <>
            <Stats showPanel={0} />
            <Stats showPanel={1} className="translate-x-24" />
            <Stats showPanel={2} className="translate-x-48" />
          </>
        )}
        <Score />
        {['gold', 'hotpink', 'cyan'].map((color, index) => (
          <MovingItem key={index} setColliders={setColliders} position={[0, 0.5, 0]}>
            <mesh castShadow>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial
                roughness={0.2}
                metalness={1}
                color={color}
              />
            </mesh>
          </MovingItem>
        ))}
        <Suspense fallback={null}>
          <Player setPlayer={setPlayer} />
          <World />
        </Suspense>
        <CheckColliders colliders={colliders} player={player} />
      </Canvas>
      <Loader />
    </div>
  );
};

export default Game;
