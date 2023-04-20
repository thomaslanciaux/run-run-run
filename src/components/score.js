import { useFrame } from '@react-three/fiber';
import { useGameContext } from '@/hooks/game-context';

export default function Score() {
  const { score, setScore, isPlaying, gameOver } = useGameContext();

  useFrame(({clock}, delta) => {
    if (isPlaying && !gameOver) {
      setScore(Math.round(score + delta * 50))
    } else {
      clock.elapsedTime = 0;
    }
  });

  return null;
};
