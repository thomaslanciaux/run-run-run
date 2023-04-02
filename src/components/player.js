import { useGameContext } from '@/hooks/game-context';
import { useFrame } from '@react-three/fiber';
import { useRef, useEffect, useState } from 'react';
import Timmy from '@/components/models/timmy';

let velocity = 0;

const Player = ({ setPlayer }) => {
  const { isPlaying, gameOver, isPaused } = useGameContext();
  const [isJumping, setIsJumping] = useState(false);
  const runner = useRef();

  setPlayer(runner);

  const keyboardEvent = (event, bool) => {
    if (event?.key !== ' ') return;
    event.preventDefault();
    setIsJumping(!gameOver && !isPaused && bool);
  };

  useEffect(() => {
    document.addEventListener('keydown', e => keyboardEvent(e, true));
    document.addEventListener('keyup', e => keyboardEvent(e, false));
    document.addEventListener('touchstart', () => setIsJumping(true));
    document.addEventListener('touchend', () => setIsJumping(false));
  }, []); // eslint-disable-line

  useFrame((_state, delta) => {
    if (!isPlaying) return velocity = 0;

    if (isJumping && runner.current.position.y == 0.0) {
      velocity = 20;
    }

    const acceleration = -100 * delta;
    runner.current.position.y += delta * (velocity + acceleration * 0.5);
    runner.current.position.y = Math.max(runner.current.position.y, 0.0);
    velocity = Math.max(velocity + acceleration, -100);
  });

  return (
    <group ref={runner} position={[0, 0, -4]}>
      <Timmy
        scale={0.8}
        position={[0, gameOver ? 0.1 : 0, 0]}
        isJumping={isJumping}
        gameOver={gameOver}
        isPaused={isPaused}
      />
    </group>
  );
};

export default Player;
