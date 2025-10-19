export default function Exercises() {
  return (
    <div className="max-w-6xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Exercise Library</h1>
      <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-5 shadow-soft">
        <input
          placeholder="Search exercises…"
          className="w-full rounded-lg bg-slate-900/70 border border-white/10 px-3 py-2 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
        <div className="mt-4 text-slate-300">
          <p>Results will appear here (API integration comes later).</p>
        </div>
      </div>
    </div>
  );
}
