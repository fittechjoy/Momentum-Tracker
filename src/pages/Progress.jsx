export default function Progress() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 py-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      {/* 🔹 Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 blur-sm"
        style={{ backgroundImage: "url('/gym-bg.jpg')" }}
        aria-hidden="true"
      ></div>

      {/* 🔹 Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-slate-900/70 to-slate-900/90"></div>

      {/* 🔹 Content */}
      <div className="relative z-10 w-full max-w-5xl text-center">
        <h1 className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-indigo-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent drop-shadow-lg">
          Your Progress
        </h1>

        <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-2xl shadow-2xl p-8 sm:p-10">
          <p className="text-slate-300 text-lg mb-6">
            Track your performance over time with progress charts and metrics.
          </p>

          <div className="h-80 flex items-center justify-center text-slate-400 text-lg border border-white/10 rounded-xl bg-slate-900/50">
            Chart placeholder — we’ll connect Chart.js here later 📊
          </div>
        </div>

        <footer className="text-center mt-10 text-xs text-slate-400">
          © {new Date().getFullYear()} Momentum Fitness Tracker — Crafted by{" "}
          <span className="text-indigo-400 font-medium">Joy Kiama</span>
        </footer>
      </div>
    </div>
  );
}
