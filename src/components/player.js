import { useGameContext } from '@/hooks/game-context';
import { useFrame } from '@react-three/fiber';
import { useRef, useEffect, useState } from 'react';
import Timmy from '@/components/models/timmy';

let velocity = 0;

const Player = ({ setPlayer }) => {
  const {
    isPlaying,
    gameOver,
    isPaused,
    acceleration,
    setAcceleration,
  } = useGameContext();
  const [isJumping, setIsJumping] = useState(false);
  const runner = useRef();

  setPlayer(runner);

  const keyboardEvent = (event, bool) => {
    if (event?.key !== ' ' && event?.key !== 'ArrowUp') return;
    event.preventDefault();
    setIsJumping(!gameOver && !isPaused && bool);
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

    if (isPlaying && !gameOver && !isPaused) {
      setAcceleration(acceleration + clock.getElapsedTime() / 100);
    }

    if (isJumping && runner.current.position.y == 0.0) {
      velocity = 20;
    }

    const jumpAcceleration = -85 * delta;
    runner.current.position.y += delta * (velocity + jumpAcceleration * 0.5);
    runner.current.position.y = Math.max(runner.current.position.y, 0.0);
    velocity = Math.max(velocity + jumpAcceleration, -100);

    isPaused || !isPlaying ? clock.stop() : clock.start();
  });

  return (
    <group ref={runner} position={[0, 0, -4]}>
      <Timmy scale={0.8} position={[0, 0, 0]} isJumping={isJumping} />
    </group>
  );
};

export default Player;
