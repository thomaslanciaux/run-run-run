import { useGameContext } from '@/hooks/game-context';
import { useFrame } from '@react-three/fiber';
import { useEffect, useState, forwardRef } from 'react';
import Timmy from '@/components/models/timmy';

let velocity = 0;

const Player = forwardRef(function Player({ acceleration }, player) {
  const {
    isPlaying,
    gameOver,
    isPaused,
  } = useGameContext();

  const [isJumping, setIsJumping] = useState(false);

  const keyboardEvent = (event, bool) => {
    if (event?.key !== ' ' && event?.key !== 'ArrowUp') return;
    event.preventDefault();
    setIsJumping(!gameOver && bool);
  };

  useEffect(() => {
    document.addEventListener('keydown', e => keyboardEvent(e, true));
    document.addEventListener('keyup', e => keyboardEvent(e, false));
    document.addEventListener('touchstart', () => setIsJumping(!gameOver && !isPaused && true));
    document.addEventListener('touchend', () => setIsJumping(false));

    return () => {
      document.removeEventListener('keydown', e => keyboardEvent(e, true));
      document.removeEventListener('keyup', e => keyboardEvent(e, false));
      document.removeEventListener('touchstart', () => setIsJumping(true));
      document.removeEventListener('touchend', () => setIsJumping(false));
    };
  });

  useFrame(({ clock }, delta) => {
    if (!isPlaying) return velocity = 0;

    if (isPlaying && !gameOver && !isPaused && acceleration.current < 0.13) {
      acceleration.current = (acceleration.current + clock.getElapsedTime() / 1000);
    }

    if (isJumping && player.current.position.y == 0.0) {
      velocity = 17;
    }

    const jumpAcceleration = -85 * delta;
    player.current.position.y += delta * (velocity + jumpAcceleration * 0.5);
    player.current.position.y = Math.max(player.current.position.y, 0.0);
    velocity = Math.max(velocity + jumpAcceleration, -100);

    isPaused || !isPlaying ? clock.stop() : clock.start();
  });

  return (
    <group ref={player} position={[0, 0, -4]}>
      <Timmy scale={0.8} position={[0, 0.03, 0]} isJumping={isJumping} />
    </group>
  );
});

export default Player;
