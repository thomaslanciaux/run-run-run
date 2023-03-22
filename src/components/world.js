import { Grid, ContactShadows, Environment, Stars, Sky } from '@react-three/drei';

const World = () => {
  return (
    <>
      <fog attach="fog" args={['#93c5fd', 25, 30]} />
      <Environment preset="warehouse" />
      <Grid
        args={[200, 200]}
        cellSize={0.5}
        cellThickness={1}
        sectionSize={4}
        cellColor="#999999"
        sectionColor="white"
        fadeDistance={50}
        fadeStrength={2}
      />
      <ContactShadows scale={[32, 32]} opacity={0.5} />
    </>
  );
};

export default World;
