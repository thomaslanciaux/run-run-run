import MovingItem from '@/components/moving-item';
import { Instances, Hydrant } from '@/components/models/hydrant';
import { BinInstances, Bin } from '@/components/models/bin';

const Colliders = ({ setColliders, obstacles }) => {
  return (
    <Instances>
      <BinInstances>
        {obstacles.map(({ positionZ, type }, index) => (
          <MovingItem
            key={index}
            setColliders={setColliders}
            position={[0, 0.5, positionZ]}
            offset={(obstacles[obstacles.length - 1].positionZ / 2) + 1}
          >
            {type === 0 && (
              <Hydrant scale={0.3} position={[0, -.5, 0]} rotation-y={Math.PI} />
            )}
            {type === 1 && (
              <Bin scale={0.0065} position={[0, -.5, 0]} />
            )}
          </MovingItem>
        ))}
      </BinInstances>
    </Instances>
  );
};

export default Colliders;
