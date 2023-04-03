import MovingItem from '@/components/moving-item';

const Colliders = ({ setColliders }) => {
  return (
    <>
      {['gold', 'hotpink', 'cyan', 'aquamarine'].map((color, index) => (
        <MovingItem
          key={index}
          setColliders={setColliders}
          position={[0, 0.5, 0]}
        >
          <mesh castShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              roughness={0.2}
              metalness={1}
              color={color}
            />
          </mesh>
        </MovingItem>
      ))}
    </>
  );
};

export default Colliders;
