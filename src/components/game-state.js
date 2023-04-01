import { useFrame } from '@react-three/fiber';

export default function GameState({
  isPlaying,
  gameOver,
  setScore,
  score,
}) {

  useFrame(({clock}, delta) => {
    if (isPlaying && !gameOver) {
      setScore(Math.round(score += delta * 100))
    } else {
      clock.elapsedTime = 0;
    }
  });

  return null;
}
