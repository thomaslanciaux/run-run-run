import { useEffect } from 'react';
import { Environment, Sky } from '@react-three/drei';
import MovingBuilding from '@/components/moving-building';
import constants from '@/libs/constants';
import { getColor } from '@/libs/utils';
import { useFrame, useLoader } from '@react-three/fiber';
import { useGameContext } from '@/hooks/game-context';
import { TextureLoader, RepeatWrapping, Vector2 } from 'three';

import roadNormal from '../../public/textures/190_norm.JPG';
import pavementNormal from '../../public/textures/178_norm.JPG';

const { OFFSET, FLOOR_ITEMS } = constants;

const floorItems = Array.from({ length: FLOOR_ITEMS }, (_, index) => ({
  positionZ: -OFFSET + (index / FLOOR_ITEMS) * OFFSET * 2,
  color: getColor()
}));

const World = ({ acceleration }) => {
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
    <>
      <fog args={['#bfd6e2', 60, 80]} attach="fog" />
      <Environment preset="dawn" />
      <ambientLight color="white" intensity={0.3} />
      <directionalLight
        castShadow
        color="orange"
        position={[-10, 20, 20]}
        shadow-camera-bottom={-80}
        shadow-camera-top={80}
        shadow-camera-left={-80}
        shadow-camera-right={80}
        shadow-mapSize={1024}
        shadow-bias={-0.0001}
        intensity={0.5}
      />
      <group position={[0, 0, 24]}>
        {floorItems.map(({ positionZ, color }, index) => (
          <MovingBuilding
            key={index}
            scale={1}
            position={[0, 0.2, positionZ]}
            rotation-y={-Math.PI / 2}
            color={color}
            acceleration={acceleration}
          />
        ))}
      </group>
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
      <Sky />
    </>
  )
};

export default World;
