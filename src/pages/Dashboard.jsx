import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <Card title="Momentum Score">
          <p className="text-4xl font-extrabold text-emerald-400">72</p>
          <p className="text-slate-400 text-sm">Keep the streak alive!</p>
        </Card>

        <Card title="Quick Actions">
          <div className="flex flex-wrap gap-3">
            <Link className="px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500" to="/plans">Start a Plan</Link>
            <Link className="px-3 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400" to="/exercises">Find Exercises</Link>
            <Link className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700" to="/progress">View Progress</Link>
          </div>
        </Card>

        <Card title="Today">
          <ul className="space-y-2 text-slate-300 text-sm">
            <li>• Log your first session</li>
            <li>• 8,000 steps goal</li>
            <li>• Stretching 10 min</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-5 shadow-soft">
      <h2 className="text-lg font-semibold mb-3 text-slate-100">{title}</h2>
      {children}
    </div>
  );
}
