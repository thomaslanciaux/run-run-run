import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader, Stats, CameraShake } from '@react-three/drei';
import World from '@/components/world';
import Player from '@/components/player';
import MovingItem from '@/components/movingItem';
import Screen from '@/components/screen';
import GameState from '@/components/game-state';

const Game = () => {
  const [score, setScore] = useState(0);
  const [player, setPlayer] = useState(null);
  const [movingItem, setMovingItem] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
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

  useEffect(() => {
    if (!gameOver) return;
    movingItem.current.position.z = -30;
  }, [gameOver, movingItem])

  useEffect(() => {
    if (!isFocused) {
      setGameOver(true);
      setIsPlaying(false);
    }
  }, [isFocused]);

  return (
    <div className={`
      md:flex h-full items-center justify-center
      bg-gradient-to-b from-blue-400 to-amber-100
    `}>
      {!isPlaying && (
        <Screen
          movingItem={movingItem}
          gameOver={gameOver}
          score={score}
          setIsPlaying={setIsPlaying}
          setGameOver={setGameOver}
          setScore={setScore}
        />
      )}
      <div className="
        absolute top-0 right-0 p-4 text-white font-bold text-xl
      ">
        {score}
      </div>
      <Canvas
        shadows
        camera={{ position: [-8, 2, -8], fov: 50 }}
      >
        {isPlaying && <Stats />}
        <ambientLight intensity={0.5} />
        <GameState
          score={score}
          setScore={setScore}
          isPlaying={isPlaying}
        />
        <MovingItem
          player={player}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          setGameOver={setGameOver}
          setMovingItem={setMovingItem}
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
          <Player setPlayer={setPlayer} isPlaying={isPlaying} />
          <World />
        </Suspense>
        <CameraShake intensity={0.3} />
      </Canvas>
      <Loader />
    </div>
  );
};

export default Game;
