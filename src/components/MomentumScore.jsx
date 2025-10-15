export default function MomentumScore() {
  const score = 72; // temporary static score

  return (
    <div className="bg-white p-4 rounded-lg shadow mt-4">
      <h2 className="text-xl font-semibold mb-2">Momentum Score</h2>
      <p className="text-3xl font-bold text-blue-600">{score}%</p>
      <p className="text-gray-600">Keep building your consistency!</p>
    </div>
  );
}
