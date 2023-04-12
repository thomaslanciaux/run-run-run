import { useGameContext } from '@/hooks/game-context';
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import constants from '@/libs/constants';

const { OFFSET } = constants;

let acceleration = 0;

const MovingItem = ({ children, position, setColliders, }) => {
  const ref = useRef();
  const { gameOver, isPaused, isPlaying } = useGameContext();

  useEffect(() => {
    if (setColliders) setColliders(prevState => [...prevState, ref]);
  }, []); // eslint-disable-line

  useFrame(({ clock }, delta) => {
    if (gameOver) acceleration = 0;
    if (!isPlaying || gameOver || isPaused) return clock.stop();
    clock.start();
    acceleration += clock.getElapsedTime() / 100;
    ref.current.position.z -= ((delta * 15) + acceleration);
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
