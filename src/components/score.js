import { useFrame } from '@react-three/fiber';
import { useGameContext } from '@/hooks/game-context';

export default function Score({ score  }) {
  const { isPlaying, gameOver } = useGameContext();

  useFrame(({clock}, delta) => {
    if (isPlaying && !gameOver) {
      score.current = Math.round(score.current + delta * 50);
    } else {
      clock.elapsedTime = 0;
    }
  });

  return null;
};
