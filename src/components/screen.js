export default function Screen({
  movingItem,
  gameOver,
  score,
  setIsPlaying,
  setGameOver,
  setScore,
}) {
  return (
    <div className="
      absolute top-0 left-0 h-full w-full grid gap-4 items-center p-4
      justify-center text-white z-10 bg-gradient-to-b from-blue-400 to-blue-500
    ">
      <button
        onClick={() => {
          setIsPlaying(true);
          setGameOver(false);
          setScore(0);
          movingItem.current.position.z = -30;
        }}
        className="text-7xl font-bold cursor-pointer"
      >
        RUN RUN RUN
      </button>
      {gameOver && (
        <div className="flex items-center justify-between">
          <div>GAME OVER!</div>
          <div>LAST SCORE: {score}</div>
        </div>
      )}
    </div>
  );
}
