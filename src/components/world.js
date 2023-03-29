import { SoftShadows, Environment } from '@react-three/drei';

const World = () => {
  return (
    <>
      <fog attach="fog" args={['#93c5fd', 25, 30]} />
      <Environment preset="dawn" />
      <directionalLight
        castShadow
        color="orange"
        position={[10, 10, 10]}
        shadow-camera-bottom={-20}
        shadow-camera-top={20}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-mapSize-width={2048}
        shadow-bias={-0.0001}
      />
      <mesh receiveShadow position={[0, 0, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[10, 200]} />
        <shadowMaterial opacity={0.1} />
      </mesh>
      <SoftShadows samples={20} />
    </>
  );
};

export default World;
