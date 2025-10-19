export default function AuthLayout({ children }) {
  return (
    <div
      className="
        relative min-h-[calc(100vh-4rem)]  /* minus navbar height */
        flex items-center justify-center
        bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900
      "
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-center bg-cover opacity-25"
        style={{ backgroundImage: "url('/weights.jpg')" }}
        aria-hidden="true"
      />

      {/* Gradient overlay to soften image */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-slate-900/40 to-slate-900/60" />

      {/* Content */}
      <div className="relative w-full max-w-md p-6">
        <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-2xl shadow-soft p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
