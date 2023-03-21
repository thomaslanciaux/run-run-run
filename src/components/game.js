import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Grid,
  ContactShadows,
  Environment,
  Loader,
} from '@react-three/drei';
import Player from '@/components/player';

const MovingItem = (props) => {
  const ref = useRef();

  useFrame((_state, delta) => {
    ref.current.position.z -= delta * 15;

    if (ref.current.position.z <= -30) {
      ref.current.position.z = 30;
    }
  });

  return (
    <group ref={ref}>{props.children}</group>
  );
};

export default function Game() {
  return (
    <div className={`
        md:flex h-full items-center justify-center 
        bg-gradient-to-b from-blue-300 to-blue-400
    `}>
      <Canvas
        shadows
        camera={{
          position: [-8, 4, -10],
          fov: 50
        }}
      >
        <fog attach="fog" args={['#93c5fd', 25, 30]} />
        <Environment preset="apartment" />
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
          <ContactShadows scale={[32, 32]} opacity={0.5} />
          <Grid args={[200, 200]} cellSize={0.5} cellThickness={1} sectionSize={4} cellColor="gray" sectionColor="white" fadeDistance={50} fadeStrength={2} />
        </Suspense>
      </Canvas>
      <Loader />
    </div>
  );
};
