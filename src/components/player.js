import { useFrame } from '@react-three/fiber';
import { useRef, useEffect, useState } from 'react';
import Timmy from '@/components/models/timmy';

let velocity = 0;

const Player = ({ setPlayer, isPlaying }) => {
  const runner = useRef();
  setPlayer(runner);
  const [isJumping, setIsJumping] = useState(false);

  const keyboardEvent = (event, bool) => {
    if (event?.key !== ' ') return;
    event.preventDefault();
    setIsJumping(bool);
  };

  useEffect(() => {
    document.addEventListener('keydown', e => keyboardEvent(e, true));
    document.addEventListener('keyup', e => keyboardEvent(e, false));
    document.addEventListener('touchstart', () => setIsJumping(true));
    document.addEventListener('touchend', () => setIsJumping(false));

    return () => {
      document.removeEventListener('keydown', e => keyboardEvent(e, true));
      document.removeEventListener('keyup', e => keyboardEvent(e, false));
      document.removeEventListener('touchstart', () => setIsJumping(true));
      document.removeEventListener('touchend', () => setIsJumping(false));
    };
  });

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
        position={[0, 0, 0]}
        isJumping={isJumping}
      />
    </group>
  );
};

export default Player;
