import { useGameContext } from '@/hooks/game-context';

export default function GameoverScreen({ resetGame }) {
  const { score, gameOver } = useGameContext();

  return gameOver ? (
    <div className="
      absolute top-0 left-0 h-full w-full grid gap-8 items-center p-4
      justify-center text-white z-10 bg-black/50 text-center
      drop-shadow-md
    ">
      <h1 className="text-7xl">GAME OVER!</h1>
      <div className="grid gap-2">
        <p className="text-3xl">Last score</p>
        <p className="text-7xl">{score * 100}</p>
      </div>
      <button
        onClick={() => resetGame()}
        className="
          bg-white/80 hover:bg-white text-black px-8 py-4 rounded-full transition
        "
      >
        RESTART
      </button>
    </div>
  ) : null;
};
