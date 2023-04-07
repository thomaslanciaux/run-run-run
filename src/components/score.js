import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
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

  return (
    <Text
      position={[0, 4, 5]}
      rotation={[0, Math.PI, 0]}
    >
      {score}
    </Text>
  );
};
