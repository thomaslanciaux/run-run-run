import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader, Stats } from '@react-three/drei';
import World from '@/components/world';
import Player from '@/components/player';
import MovingItem from '@/components/movingItem';

const Game = () => {
  const [score, setScore] = useState(0);
  const [player, setPlayer] = useState(null);
  const [movingItem, setMovingItem] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (!gameOver) return;
    movingItem.current.position.z = -30;
  }, [gameOver, movingItem, score])

  return (
    <div className={`
      md:flex h-full items-center justify-center
      bg-gradient-to-b from-blue-400 to-blue-500
    `}>
      {!isPlaying && (
        <div className="absolute top-0 left-0 h-full w-full grid gap-4 items-center justify-center text-white z-10 bg-blue-400">
          <div
            onClick={() => {
              setIsPlaying(true);
              setGameOver(false);
              setScore(0);
              movingItem.current.position.z = -30;
            }}
            className="text-7xl font-bold"
          >
            RUN RUN RUN
          </div>
          {gameOver && (
            <div className="flex items-center justify-between">
              <div>GAME OVER!</div>
              <div>LAST SCORE: {score}</div>
            </div>
          )}
        </div>
      )}
      <div className="absolute top-0 right-0 p-4 text-white font-bold">{score}</div>
      <Canvas
        shadows
        camera={{
          position: [-8, 4, -8],
          fov: 50
        }}
      >
        <Stats style={2} />
        <MovingItem
          player={player}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          setGameOver={setGameOver}
          setMovingItem={setMovingItem}
          setScore={setScore}
        >
          <mesh
            castShadow
            position={[0, 0.5, 0]}
          >
            <boxGeometry
              attach="geometry"
              args={[1, 1, 1]}
            />
            <meshStandardMaterial
              roughness={0.2}
              metalness={0.3}
              color="#ffffff"
            />
          </mesh>
        </MovingItem>
        <Suspense fallback={null}>
          <Player setPlayer={setPlayer} />
          <World />
        </Suspense>
      </Canvas>
      <Loader />
    </div>
  );
};

export default Game;
