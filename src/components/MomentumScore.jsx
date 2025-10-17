export default function MomentumScore({ workouts }) {
  // Simple logic: base score = number of workouts × 10, capped at 100
  const totalWorkouts = workouts.length;
  const score = Math.min(totalWorkouts * 10, 100);

  // Feedback message
  const getMessage = () => {
    if (score === 0) return "Let's get moving! Log your first workout 💪🏾";
    if (score < 50) return "Good start! Keep building that momentum ⚡";
    if (score < 80) return "You're on fire! Stay consistent 🔥";
    return "Elite consistency! Keep it up 💯";
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mt-4 text-center">
      <h2 className="text-xl font-semibold mb-2">Momentum Score</h2>
      <p className="text-5xl font-bold text-blue-600 mb-2">{score}%</p>
      <p className="text-gray-700">{getMessage()}</p>
    </div>
  );
}
