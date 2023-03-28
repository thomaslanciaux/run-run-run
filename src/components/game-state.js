import { useFrame } from '@react-three/fiber';

export default function GameState({ isPlaying, setScore }) {

  useFrame(({clock}) => {
    if (isPlaying) {
      setScore(Math.round(clock.elapsedTime * 2) * 10)
    } else {
      clock.elapsedTime = 0;
    }
  });

  return null;
}
