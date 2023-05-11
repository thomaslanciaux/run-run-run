import { useGameContext } from '@/hooks/game-context';

export default function PausedScreen() {
  const { isPaused, setIsPaused, gameOver } = useGameContext(); 
  return isPaused && !gameOver && (
    <div className="
      absolute top-0 left-0 h-full w-full grid gap-8 items-center p-4
      justify-center text-white z-10 bg-black/50
    ">
      <h1 className="text-7xl">PAUSED</h1>
      <button
        onClick={() => setIsPaused(false)}
        className="bg-white/80 hover:bg-white text-black px-8 py-4 rounded-full transition"
      >
        CONTINUE
      </button>
    </div>
  );
};
