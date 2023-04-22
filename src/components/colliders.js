import MovingItem from '@/components/moving-item';

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
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        </MovingItem>
      ))}
    </>
  );
};

export default Colliders;
