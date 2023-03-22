import { useFrame } from '@react-three/fiber';
import { useRef, useEffect, useState } from 'react';
import Bot from '@/components/models/bot';

const Player = () => {
  const runner = useRef();
  const [isJumping, setIsJumping] = useState(false);
  let velocity = 0;

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
      ['keydown', 'touchstart'].forEach(event =>
        document.removeEventListener(event, () => setIsJumping(true))
      );
      ['keyup', 'touchend'].forEach(event =>
        document.removeEventListener(event, () => setIsJumping(false))
      );
    };
  });

  useFrame((_state, delta) => {
    if (isJumping && runner.current.position.y == 0.0) {
      velocity = 30;
    }
    if (!isJumping) {
      velocity = -20;
    }
    const acceleration = -170 * delta;
    runner.current.position.y += delta * (velocity + acceleration * 0.5);
    runner.current.position.y = Math.max(runner.current.position.y, 0.0);
    velocity = Math.max(velocity + acceleration, -100);
  });

  return (
    <group ref={runner}>
      <Bot
        scale={0.5}
        position={[0, 0, -4]}
        isJumping={isJumping}
      />
    </group>
  );
};

export default Player;
