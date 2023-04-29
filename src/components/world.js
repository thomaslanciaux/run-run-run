import { Environment, Sky, useNormalTexture } from '@react-three/drei';
import MovingBuilding from '@/components/moving-building';
import constants from '@/libs/constants';
import { getColor } from '@/libs/utils';
import { useFrame } from '@react-three/fiber';
import { useGameContext } from '@/hooks/game-context';
import * as THREE from 'three';

const { OFFSET, FLOOR_ITEMS } = constants;

const floorItems = Array.from({ length: FLOOR_ITEMS }, (_, index) => ({
  positionZ: -OFFSET + (index / FLOOR_ITEMS) * OFFSET * 2,
  color: getColor()
}));

const World = ({ acceleration }) => {
  const { isPlaying, gameOver, isPaused } = useGameContext();
  const [pavementNormalMap] = useNormalTexture(27, {
    offset: [0, 0],
    repeat: [12, 120],
  });

  const [roadNormalMap] = useNormalTexture(39, {
    offset: [0, 0],
    repeat: [120, 120],
  });

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
        intensity={0.8}
      />
      <group position={[0, 0, 24]}>
        {floorItems.map(({ positionZ, color }, index) => (
          <MovingBuilding
            key={index}
            scale={1}
            position={[0, -0.1, positionZ]}
            rotation-y={-Math.PI / 2}
            color={color}
            acceleration={acceleration}
          />
        ))}
      </group>
      <mesh rotation-x={-Math.PI / 2} receiveShadow castShadow position={[14, -0.1, 24]}>
        <boxGeometry args={[35, 120, 0.3, 1, 1]} />
        <meshStandardMaterial
          color="#333333"
          roughness={0.9}
          normalMap={pavementNormalMap}
          normalScale={new THREE.Vector2(10, 10)}
        />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} receiveShadow position={[0, -0.15, 24]}>
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial
          color="#111111"
          roughness={0.9}
          normalMap={roadNormalMap}
          normalScale={new THREE.Vector2(5, 5)}
        />
      </mesh>
      <Sky />
    </>
  )
};

export default World;
