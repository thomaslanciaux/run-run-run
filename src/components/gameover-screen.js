export default function GameoverScreen({ resetGame, score }) {
  return (
    <div className="
      absolute top-0 left-0 h-full w-full grid gap-8 items-center p-4
      justify-center text-white z-10 bg-black/50 text-center
    ">
      <h1 className="text-7xl">GAME OVER!</h1>
      <p className="text-xl">Last score: {score}</p>
      <button
        onClick={() => resetGame()}
        className="bg-white text-black px-8 py-4 rounded-full"
      >
        RESTART
      </button>
    </div>
  );
};
