import { useGameContext } from '@/hooks/game-context';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const MovingItem = ({ children, setMovingItem, player, position, collision = true }) => {
  const ref = useRef();
  const {
    gameOver,
    isPaused,
    isPlaying,
    setGameOver,
  } = useGameContext();

  setMovingItem(ref);

  useFrame(({ clock }, delta) => {

    if (gameOver) return;

    isPaused || !isPlaying ? clock.stop() : clock.start();

    ref.current.position.z -= (delta * 15);

    if (ref.current.position.z <= -30) {
      ref.current.position.z = 30;
    }

    if (!collision) return;

    if (
      ref.current.position.z <= -3 &&
      ref.current.position.z > -5.2 &&
      player?.current?.position?.y <= 1 &&
      ref.current.position.x === player?.current?.position?.x ||
      (ref.current.position.z < -2.5 && ref.current.position.z > -10 && isPaused)
    ) {
      setGameOver(true);
      ref.current.position.z = -3;
    }
  });

  return (
    <group ref={ref} position={position}>
      {children}
    </group>
  );
};

export default MovingItem;
