import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useGameContext } from '@/hooks/game-context';
import { useRef } from 'react';

export default function Score({ score }) {
  const { isPlaying, gameOver, isPaused } = useGameContext();
  const ref = useRef();

  useFrame(({ clock }, delta) => {
    if (isPaused) return;
    if (isPlaying && !gameOver) {
      score.current = Math.round(score.current + delta * 50);
      if (!ref.current) return;
      ref.current.textContent = score.current * 100;
    } else {
      clock.elapsedTime = 0;
    }
  });

  return !gameOver && (
    <Html
      ref={ref}
      fullscreen
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        padding: '2rem',
        fontSize: '2rem',
        color: '#ffffff',
        pointerEvents: 'none'
      }}
    />
  );
};
