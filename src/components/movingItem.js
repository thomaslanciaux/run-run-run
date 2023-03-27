import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const MovingItem = ({ player, isPlaying, setIsPlaying, setGameOver, children }) => {
  const ref = useRef();

  useFrame((_state, delta) => {
    if (!isPlaying) return;
    ref.current.position.z -= delta * 15;

    if (ref.current.position.z <= -30) {
      ref.current.position.z = 30;
    }

    if (
      ref.current.position.z <= -3.5 &&
      ref.current.position.z > -4 &&
      player?.current?.position.y <= 1
    ) {
      setIsPlaying(false);
      setGameOver(true);
    }
  });

  return (
    <group ref={ref}>{children}</group>
  );
};

export default MovingItem;
