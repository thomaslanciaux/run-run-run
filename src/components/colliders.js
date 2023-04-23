import MovingItem from '@/components/moving-item';
import Hydrant from '@/components/models/hydrant';

const Colliders = ({ setColliders, obstacles }) => {
  return (
    <>
      {obstacles.map(({ positionZ }, index) => (
        <MovingItem
          key={index}
          setColliders={setColliders}
          position={[0, 0.5, positionZ]}
          offset={(obstacles[obstacles.length - 1].positionZ / 2) + 1}
        >
          <Hydrant scale={0.3} position={[0, -.5, 0]} rotation-y={Math.PI} />
        </MovingItem>
      ))}
    </>
  );
};

export default Colliders;
