import { useGameContext } from '@/hooks/game-context';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import constants from '@/libs/constants';
import { Building1 } from '@/components/models/building1';
import { Building2 } from '@/components/models/building2';
import { Building3 } from '@/components/models/building3';
import { House } from '@/components/models/house';
import { House2 } from '@/components/models/house2';

const { OFFSET } = constants;

const MovingBuilding = ({ acceleration, position, type }) => {
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
        <Building1 scale={2.5} position={[0, 0, 0]} rotation-y={Math.PI / 2} />
      )}
      {type === 1 && (
        <Building2 scale={2} position={[-0.5, 0, 0]} rotation-y={-Math.PI / 2} />
      )}
      {type === 2 && (
        <Building3 scale={2} position={[-1, 0, 0]} rotation-y={-Math.PI / 2} />
      )}
      {type === 3 && (
        <House scale={2.6} position={[1, 0, 0]} rotation-y={-Math.PI / 2} />
      )}
      {type === 4 && (
        <House2 scale={2.6} position={[1, 0, 0]} rotation-y={-Math.PI / 2} />
      )}
    </group>
  );
};

export default MovingBuilding;
