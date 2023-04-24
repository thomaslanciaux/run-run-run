import { useGameContext } from '@/hooks/game-context';
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';

const MovingItem = ({ children, position, setColliders, offset }) => {
  const ref = useRef();
  const { gameOver, isPaused, isPlaying, acceleration } = useGameContext();

  useEffect(() => {
    if (setColliders) setColliders(prevState => [...prevState, ref]);
  }, []); // eslint-disable-line

  useFrame((_state, delta) => {
    if (!isPlaying || gameOver || isPaused) return;

    ref.current.position.z -= (delta * 15) + acceleration;

    if (ref.current.position.z <= -offset - acceleration) {
      ref.current.position.z = offset + acceleration;
    }
  });

  return (
    <group ref={ref} position={position}>
      {children}
    </group>
  );
};

export default MovingItem;
