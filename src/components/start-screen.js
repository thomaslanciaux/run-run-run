import { useGameContext } from '@/hooks/game-context';

export default function StartScreen({ resetGame, player }) {
  const { isPlaying } = useGameContext();
  return !isPlaying && (
    <div className="
      absolute top-0 left-0 h-full w-full grid gap-8 items-center p-4
      justify-center text-white z-10 bg-gradient-to-b from-blue-400 to-blue-500
    ">
      <h1 className="text-7xl">RUN RUN RUN</h1>
      <button
        onClick={() => player.current && resetGame()}
        className={`
          bg-white/80 hover:bg-white text-blue-500 text-xl rounded-full px-8 py-4
          uppercase transition
        `}
      >
        {!player.current ? 'Loading…' : 'Play!'}
      </button>
    </div>
  );
}
