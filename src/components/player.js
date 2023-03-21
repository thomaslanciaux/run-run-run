import { useFrame } from '@react-three/fiber';
import { useRef, useEffect, useState } from 'react';
import Bot from '@/components/models/bot';

export default function Player() {
  const runner = useRef();
  const [isJumping, setIsJumping] = useState(false);
  const mouseDown = () => setIsJumping(true);
  const mouseUp = () => setIsJumping(false);
  let velocity = 0;

  useEffect(() => {
    document.addEventListener('mousedown', mouseDown);
    document.addEventListener('mouseup', mouseUp);

    return () => {
      document.removeEventListener('mousedown', mouseDown);
      document.removeEventListener('mouseup', mouseUp);
    };
  });

  useFrame((_state, delta) => {
    if (isJumping && runner.current.position.y == 0.0) {
      velocity = 30;
    }
    if (!isJumping) {
      velocity = -20;
    }
    const acceleration = -120 * delta;
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
