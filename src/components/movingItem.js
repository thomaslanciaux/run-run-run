import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Trail } from '@react-three/drei';

const MovingItem = ({
  player,
  isPlaying,
  gameOver,
  isPaused,
  setGameOver,
  setMovingItem,
  children
}) => {
  const ref = useRef();
  setMovingItem(ref);

  useFrame((_state, delta) => {
    if (!isPlaying || gameOver || isPaused) return null;

    ref.current.position.z -= delta * 15;

    if (ref.current.position.z <= -30) {
      ref.current.position.z = 30;
    }

    if (
      ref.current.position.z <= -3 &&
      ref.current.position.z > -3.5 &&
      player?.current?.position?.y <= 1 &&
      ref.current.position.x === player?.current?.position?.x
    ) {
      setGameOver(true);
    }
  });

  return (
    <group ref={ref}>
      <Trail
        width={1}
        length={3}
        color="white"
        attenuation={(t) => t * t}
      >
        {children}
      </Trail>
    </group>
  );
};

export default MovingItem;
