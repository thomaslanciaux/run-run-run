import { Environment, Sky } from '@react-three/drei';
import MovingBuilding from '@/components/moving-building';
import constants from '@/libs/constants';
import { getColor } from '@/libs/utils';

const { OFFSET, FLOOR_ITEMS } = constants;

const floorItems = Array.from({ length: FLOOR_ITEMS }, (_, index) => ({
  positionZ: -OFFSET + (index / FLOOR_ITEMS) * OFFSET * 2,
  color: getColor()
}));

const World = ({ acceleration }) => (
  <>
    <fog args={['#bfd6e2', 40, 60]} attach="fog" />
    <Environment preset="dawn" />
    <directionalLight
      castShadow
      color="orange"
      position={[15, 40, 20]}
      shadow-camera-bottom={-80}
      shadow-camera-top={80}
      shadow-camera-left={-80}
      shadow-camera-right={80}
      shadow-mapSize={512}
      shadow-bias={-0.0001}
      intensity={0.5}
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
      <meshStandardMaterial color="#333333" roughness={0.8} />
    </mesh>
    <mesh rotation-x={-Math.PI / 2} receiveShadow position={[0, -0.15, 24]}>
      <planeGeometry args={[120, 120]} />
      <meshStandardMaterial color="#000000" roughness={0.9} metalness={0} />
    </mesh>
    <Sky
    />
  </>
);

export default World;
