import { useGameContext } from '@/hooks/game-context';

export default function ScoreScreen({ score }) {
  const { isPlaying, gameOver } = useGameContext();
  if (!isPlaying || gameOver) return;

  return (
    <div className="fixed bottom-0 right-0 text-white text-3xl p-4 drop-shadow-md">
      {score.current * 100}
    </div>
  );
};
