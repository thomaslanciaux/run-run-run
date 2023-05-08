import { useEffect } from 'react';
import { TextureLoader, RepeatWrapping, Vector2 } from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import { useGameContext } from '@/hooks/game-context';

import roadNormal from '../../public/textures/190_norm.JPG';
import pavementNormal from '../../public/textures/178_norm.JPG';

const Ground = ({ acceleration }) => {
  const { isPlaying, gameOver, isPaused } = useGameContext();

  const [roadNormalMap, pavementNormalMap] = useLoader(TextureLoader, [
    roadNormal.src,
    pavementNormal.src
  ]);

  useEffect(() => {
    [roadNormalMap, pavementNormalMap].forEach(normalMap => {
      normalMap.wrapS = RepeatWrapping;
      normalMap.wrapT = RepeatWrapping;
    });
    roadNormalMap.repeat.set(120, 120);
    pavementNormalMap.repeat.set(12, 120);
  }, [roadNormalMap, pavementNormalMap]);

  useFrame((_state, delta) => {
    if (!isPlaying || gameOver || isPaused) return;
    [pavementNormalMap, roadNormalMap].map(normalMap =>
      normalMap.offset.y -= (delta * 15) + acceleration.current
    );
  });

  return (
    <group>
      <mesh
        position={[14, -0.1, 24]}
        rotation-x={-Math.PI / 2}
        receiveShadow
        castShadow
      >
        <boxGeometry args={[35, 120, 0.3, 1, 1]} />
        <meshStandardMaterial
          color="#444444"
          roughness={1}
          normalMap={pavementNormalMap}
          normalScale={new Vector2(10, 10)}
        />
      </mesh>
      <mesh
        position={[0, -0.15, 24]}
        rotation-x={-Math.PI / 2}
        receiveShadow
      >
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial
          color="#333333"
          roughness={0.9}
          normalMap={roadNormalMap}
          normalScale={new Vector2(5, 5)}
        />
      </mesh>
    </group>
  );
};

export default Ground;
