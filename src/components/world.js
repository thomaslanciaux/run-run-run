import { Environment, Sky } from '@react-three/drei';
import MovingBuilding from '@/components/moving-building';
import { BakeryInstances } from '@/components/models/bakery';
import { BarInstances } from '@/components/models/bar';
import { CinemaInstances } from '@/components/models/cinema';
import Ground from '@/components/ground';
import constants from '@/libs/constants';
import { getColor } from '@/libs/utils';

const { OFFSET, FLOOR_ITEMS } = constants;

const floorItems = Array.from({ length: FLOOR_ITEMS }, (_, index) => ({
  positionZ: -OFFSET + (index / FLOOR_ITEMS) * OFFSET * 2,
  type: Math.floor(Math.random() * 4),
  color: getColor()
}));

const World = ({ acceleration }) => {
  return (
    <>
      <fog args={['#bfd6e2', 60, 80]} attach="fog" />
      <Environment preset="dawn" />
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
        intensity={0.3}
      />
      <group position={[12, -0.1, 24]} scale={1.2}>
        <BakeryInstances>
        <BarInstances>
        <CinemaInstances>
          {floorItems.map(({ positionZ, color, type }, index) => (
            <MovingBuilding
              key={index}
              scale={1}
              position={[0, 0, positionZ]}
              rotation-y={-Math.PI / 2}
              color={color}
              type={type}
              acceleration={acceleration}
            />
          ))}
        </CinemaInstances>
        </BarInstances>
        </BakeryInstances>
      </group>
      <Ground acceleration={acceleration} />
      <Sky />
    </>
  )
};

export default World;
