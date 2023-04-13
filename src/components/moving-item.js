import { useGameContext } from '@/hooks/game-context';
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import constants from '@/libs/constants';

const { OFFSET } = constants;

const MovingItem = ({ children, position, setColliders, }) => {
  const ref = useRef();
  const { gameOver, isPaused, isPlaying } = useGameContext();

  useEffect(() => {
    if (setColliders) setColliders(prevState => [...prevState, ref]);
  }, []); // eslint-disable-line

  useFrame((_state, delta) => {
    if (!isPlaying || gameOver || isPaused) return;
    ref.current.position.z -= (delta * 15);
    if (ref.current.position.z <= -OFFSET) {
      ref.current.position.z = OFFSET;
    }
  });

  return (
    <group ref={ref} position={position}>
      {children}
    </group>
  );
};

export default MovingItem;
