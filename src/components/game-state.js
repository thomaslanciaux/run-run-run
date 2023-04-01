import { useFrame } from '@react-three/fiber';

export default function GameState({
  isPlaying,
  gameOver,
  setScore,
  score,
  isPaused
}) {
  useFrame(({clock}, delta) => {
    isPaused ? clock.stop() : clock.start();
    if (isPlaying && !gameOver && !isPaused) {
      setScore(Math.round(score += delta * 100))
    } else {
      clock.elapsedTime = 0;
    }
  });

  return null;
}
