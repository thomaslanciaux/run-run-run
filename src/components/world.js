import { Environment, Sky } from '@react-three/drei';
import MovingBuilding from '@/components/moving-building';
import { Building1Instances } from '@/components/models/building1';
import { Building2Instances } from '@/components/models/building2';
import { Building3Instances } from '@/components/models/building3';
import { HouseInstances } from '@/components/models/house';
import { House2Instances } from '@/components/models/house2';
import Ground from '@/components/ground';
import constants from '@/libs/constants';
import { getColor } from '@/libs/utils';

const { OFFSET, FLOOR_ITEMS } = constants;

const floorItems = Array.from({ length: FLOOR_ITEMS }, (_, index) => ({
  positionZ: -OFFSET + (index / FLOOR_ITEMS) * OFFSET * 2,
  type: Math.floor(Math.random() * 5),
  color: getColor()
}));

const World = ({ acceleration }) => {
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
      <group position={[16, 0, 24]}>
        <Building1Instances>
          <Building2Instances>
            <Building3Instances>
              <HouseInstances>
                <House2Instances>
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
                </House2Instances>
              </HouseInstances>
            </Building3Instances>
          </Building2Instances>
        </Building1Instances>
      </group>
      <Ground acceleration={acceleration} />
      <Sky />
    </>
  )
};

export default World;
