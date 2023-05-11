import { useGameContext } from '@/hooks/game-context';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import constants from '@/libs/constants';
import Building from '@/components/models/building';
import { Bakery } from '@/components/models/bakery';
import { Bar } from '@/components/models/bar';
import { Cinema } from '@/components/models/cinema';

const { OFFSET } = constants;

const MovingBuilding = ({ acceleration, position, type, color }) => {
  const ref = useRef();
  const { gameOver, isPaused, isPlaying } = useGameContext();

  useFrame((_state, delta) => {
    if (!isPlaying || gameOver || isPaused) return;

    ref.current.position.z -= (delta * 15) + acceleration.current;

    if (ref.current.position.z <= -OFFSET) ref.current.position.z = OFFSET;
  });

  return (
    <group ref={ref} position={position}>
      {type === 0 && (
        <Bakery scale={0.5} rotation-y={-Math.PI / 2} position={[0, 0, 0]}/>
      )}
      {type === 1 && (
        <Building scale={0.9} rotation-y={-Math.PI / 2} color={color}/>
      )}
      {type === 2 && (
        <Bar scale={0.025} rotation-y={Math.PI / 2} position={[3, 1, 0]} />
      )}
      {type === 3 && (
        <Cinema scale={0.53} rotation-y={-Math.PI / 2} position={[-0.5, 0, 0]} />
      )}
    </group>
  );
};

export default MovingBuilding;
