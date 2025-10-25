export default function AuthLayout({ children }) {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-6 sm:px-10 py-12
      bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 overflow-hidden"
    >
      {/* 🔹 Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 blur-sm"
        style={{ backgroundImage: "url('/gym-bg.jpg')" }}
        aria-hidden="true"
      ></div>

      {/* 🔹 Overlay to enhance contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-slate-900/80 to-slate-900/90"></div>

      {/* 🔹 Main content container */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-6xl space-y-10 md:space-y-0">
        
        {/* 🔹 Left side — Title and Description */}
        <div className="flex flex-col md:w-1/2 space-y-5 text-center md:text-left px-4 md:px-8">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent drop-shadow-lg">
            Momentum Fitness Tracker
          </h1>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-md mx-auto md:mx-0">
            Track your workouts, visualize your progress, and stay committed to your fitness goals.
            <br />
            <span className="text-indigo-400 font-semibold">
              Consistency builds momentum.
            </span>
          </p>
        </div>

        {/* 🔹 Right side — Auth card */}
        <div className="w-full md:w-[420px] backdrop-blur-xl bg-white/10 border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8">
          {children}
        </div>
      </div>

      {/* 🔹 Footer */}
      <footer className="absolute bottom-4 text-center w-full text-xs text-slate-400">
        © {new Date().getFullYear()} Momentum Fitness Tracker — Crafted by{" "}
        <span className="text-indigo-400 font-medium">Joy Kiama</span>
      </footer>
    </div>
  );
}
