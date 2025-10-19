
export default function MomentumScore({ workouts }) {
  
  const score = workouts.length || 0;
  const maxScore = 10; // You can change this later
  const percentage = Math.min((score / maxScore) * 100, 100);

  return (
    <div className="flex flex-col items-center justify-center bg-slate-900/50 border border-white/10 p-6 rounded-xl shadow-soft">
      <h2 className="text-xl font-semibold mb-4">Momentum Score</h2>

  
      <div className="relative w-40 h-40 flex items-center justify-center">
        <svg
          className="w-full h-full transform -rotate-90"
          viewBox="0 0 100 100"
        >
          {/* Background Circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="10"
            fill="none"
          />

          {/* Progress Circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#4ade80" // green
            strokeWidth="10"
            fill="none"
            strokeDasharray="283" // 2πr = 2 * π * 45 ≈ 283
            strokeDashoffset={283 - (283 * percentage) / 100}
            strokeLinecap="round"
          />
        </svg>

        {/* Score in the center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold text-white">{score}</span>
        </div>
      </div>

      <p className="mt-3 text-slate-300">
        {score}/{maxScore} workouts
      </p>
    </div>
  );
}
