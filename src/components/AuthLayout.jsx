export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900/70 relative">
      <div className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url('/src/assets/gym-bg.jpg')" }}>
      </div>

      <div className="relative flex w-11/12 max-w-5xl bg-white/10 border border-white/10 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden">
        
        
        <div className="w-1/2 flex flex-col justify-center items-center p-10 text-center text-white">
          <h1
            className="text-4xl font-extrabold tracking-wide"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Momentum Fitness Tracker
          </h1>
          <p className="mt-4 text-slate-300 max-w-sm">
            Track workouts, visualize progress, and stay motivated along your fitness journey.
          </p>
        </div>

        
        <div className="w-1/2 bg-slate-900/80 p-10 flex items-center justify-center">
          <div className="w-full max-w-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}
