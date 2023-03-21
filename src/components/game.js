import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader, Stats } from '@react-three/drei';

import World from '@/components/world';
import Player from '@/components/player';
import MovingItem from '@/components/movingItem';

const Game = () => {
  return (
    <div className={`
        md:flex h-full items-center justify-center 
        bg-gradient-to-b from-blue-400 to-blue-500
    `}>
      <Canvas
        shadows
        camera={{
          position: [-8, 4, -10],
          fov: 50
        }}
      >
        <Stats style={2} />
        <MovingItem>
          <mesh
            castShadow
            position={[0, 0.5, 20]}
          >
            <boxGeometry
              attach="geometry"
              args={[1, 1, 1]}
            />
            <meshStandardMaterial />
          </mesh>
        </MovingItem>
        <Suspense fallback={null}>
          <Player />
          <World />
        </Suspense>
      </Canvas>
      <Loader />
    </div>
  );
};

export default Game;
