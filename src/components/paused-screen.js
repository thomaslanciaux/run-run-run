export default function PausedScreen({ setIsPaused }) {
  return (
    <div className="
      absolute top-0 left-0 h-full w-full grid gap-8 items-center p-4
      justify-center text-white z-10 bg-black/50
    ">
      <h1 className="text-7xl">PAUSED</h1>
      <button
        onClick={() => setIsPaused(false)}
        className="bg-white text-black px-8 py-4 rounded-full"
      >
        CONTINUE
      </button>
    </div>
  );
};
