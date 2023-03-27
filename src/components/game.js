import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader, Stats } from '@react-three/drei';
import World from '@/components/world';
import Player from '@/components/player';
import MovingItem from '@/components/movingItem';

const Game = () => {
  const [score, setScore] = useState(0);
  const [player, setPlayer] = useState(null);
  const [collision, setCollision] = useState(false);

  return (
    <div className={`
      md:flex h-full items-center justify-center
      bg-gradient-to-b from-blue-400 to-blue-500
    `}>
      <div className="absolute top-0 right-0 p-4 text-white font-bold">{score}</div>
      <Canvas
        shadows
        camera={{
          position: [-8, 4, -8],
          fov: 50
        }}
      >
        <Stats style={2} />
        <MovingItem player={player} setCollision={setCollision}>
          <mesh
            castShadow
            position={[0, 0.5, 20]}
          >
            <boxGeometry
              attach="geometry"
              args={[1, 1, 1]}
            />
            <meshStandardMaterial
              roughness={0.2}
              metalness={0.3}
              color={collision ? 'red' : 'white'}
            />
          </mesh>
        </MovingItem>
        <Suspense fallback={null}>
          <Player setScore={setScore} setPlayer={setPlayer} />
          <World />
        </Suspense>
      </Canvas>
      <Loader />
    </div>
  );
};

export default Game;
