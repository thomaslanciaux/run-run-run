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

  useFrame(({ clock }, delta) => {
    if (!isPlaying || gameOver || isPaused) return;
    
    ref.current.position.z -= (delta * 15);

    if (ref.current.position.z <= -30) {
      ref.current.position.z = 30;
    }

    if (
      ref.current.position.z <= -3 &&
      ref.current.position.z > -5 &&
      player?.current?.position?.y <= 1 &&
      ref.current.position.x === player?.current?.position?.x
    ) {
      setGameOver(true);
      ref.current.position.z = -3;
    }
  });

  return (
    <group ref={ref}>
      {children}
    </group>
  );
};

export default MovingItem;
