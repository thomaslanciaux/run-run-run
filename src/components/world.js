import { Environment, Cloud, Sky } from '@react-three/drei';
import MovingBuilding from '@/components/moving-building';
import constants from '@/libs/constants';
import { getColor } from '@/libs/utils';

const { OFFSET, FLOOR_ITEMS } = constants;
const CLOUD_TEXTURE = '/textures/cloud.png';

const floorItems = Array.from({ length: FLOOR_ITEMS }, (_, index) => ({
  positionZ: -OFFSET + (index / FLOOR_ITEMS) * OFFSET * 2,
  color: getColor()
}));

const World = () => (
  <>
    <ambientLight intensity={0.5} />
    {/*<fog args={['#93c5fd', 80, 100]} attach="fog" />*/}
    <Environment preset="dawn" />
    <directionalLight
      castShadow
      color="white"
      position={[-20, 15, 15]}
      shadow-camera-bottom={-80}
      shadow-camera-top={80}
      shadow-camera-left={-80}
      shadow-camera-right={80}
      shadow-mapSize={2048}
      shadow-bias={-0.0001}
      intensity={0.5}
    />
    <group position={[0, 0.25, 24]}>
      {floorItems.map(({ positionZ, color }, index) => (
        <MovingBuilding
          key={index}
          scale={1}
          position={[0, -0.1, positionZ]}
          rotation-y={-Math.PI / 2}
          color={color}
        />
      ))}
    </group>
    <mesh rotation-x={-Math.PI / 2} receiveShadow position={[0, 0, 0]}>
      <planeGeometry args={[1000, 1000]} />
      <meshStandardMaterial color="#333333" roughness={0.8} metalness={0.3} />
    </mesh>
    <Sky />
    <group position={[10, 2, 0]}>
      <Cloud texture={CLOUD_TEXTURE} depth={30} position={[25, 10, -5]} args={[1, 1]} scale={1} />
      <Cloud texture={CLOUD_TEXTURE} depth={30} position={[25, 8, -7]} args={[1, 2]} scale={0.8} />
      <Cloud texture={CLOUD_TEXTURE} depth={25} position={[28, 12, -7]} args={[1, 2]} scale={1} />
      <Cloud texture={CLOUD_TEXTURE} depth={26} position={[25, 10, 20]} args={[1, 3]} scale={0.8} />
    </group>
  </>
);

export default World;
