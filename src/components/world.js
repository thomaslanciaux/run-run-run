import { Grid, ContactShadows, Environment } from '@react-three/drei';

const World = () => {
  return (
    <>
      <fog attach="fog" args={['#93c5fd', 25, 30]} />
      <Environment preset="apartment" />
      <Grid
        args={[200, 200]}
        cellSize={0.5}
        cellThickness={1}
        sectionSize={4}
        cellColor="gray"
        sectionColor="white"
        fadeDistance={50}
        fadeStrength={2}
      />
      <ContactShadows scale={[32, 32]} opacity={0.5} />
    </>
  );
};

export default World;
