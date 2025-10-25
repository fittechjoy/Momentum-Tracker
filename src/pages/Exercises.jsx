import { useState, useEffect } from "react";

export default function Exercises() {
  const [exercises, setExercises] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const API_KEY = import.meta.env.VITE_API_NINJAS_KEY;

  const fetchExercises = async (query) => {
    if (!query.trim()) {
      setExercises([]);
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://api.api-ninjas.com/v1/exercises?name=${query}`,
        {
          headers: { "X-Api-Key": API_KEY },
        }
      );
      if (!response.ok) throw new Error("API request failed");

      const data = await response.json();
      setExercises(data);
    } catch (err) {
      setError("Failed to fetch exercises. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchExercises(search);
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [search]);

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
      <div className="relative z-10 w-full max-w-5xl">
        <h1 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-indigo-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent drop-shadow-lg">
          Exercise Library
        </h1>

        <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-2xl shadow-2xl p-8 sm:p-10">
          <p className="text-slate-300 text-lg mb-6 text-center">
            Search through a library of exercises to plan your next workout.
          </p>

          {/* 🔍 Search Input */}
          <input
            type="text"
            placeholder="Search exercises..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg bg-slate-900/70 border border-white/10 px-4 py-2 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />

          {/* 🌀 Loading */}
          {loading && (
            <p className="mt-4 text-center text-slate-300">
              Loading exercises...
            </p>
          )}

          {/* ⚠️ Error */}
          {error && <p className="mt-4 text-red-400 text-center">{error}</p>}

          {/* 📋 Results */}
          {!loading && !error && exercises.length > 0 && (
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto">
              {exercises.map((ex) => (
                <li
                  key={ex.name}
                  className="border border-white/10 rounded-xl bg-slate-800/60 p-4 hover:bg-slate-800/90 transition"
                >
                  <p className="font-semibold text-slate-100">{ex.name}</p>
                  <p className="text-sm text-slate-300 mt-1">
                    <strong>Type:</strong> {ex.type} |{" "}
                    <strong>Muscle:</strong> {ex.muscle}
                  </p>
                  <p className="text-xs text-slate-400 mt-1 italic">
                    Equipment: {ex.equipment || "Bodyweight"}
                  </p>
                </li>
              ))}
            </ul>
          )}

          {/* 🕳️ No Results */}
          {!loading &&
            !error &&
            exercises.length === 0 &&
            search.trim() !== "" && (
              <p className="mt-6 text-slate-400 text-center">
                No exercises found for "<span className="italic">{search}</span>
                ".
              </p>
            )}
        </div>

        {/* 🔹 Footer */}
        <footer className="text-center mt-10 text-xs text-slate-400">
          © {new Date().getFullYear()} Momentum Fitness Tracker — Crafted by{" "}
          <span className="text-indigo-400 font-medium">Joy Kiama</span>
        </footer>
      </div>
    </div>
  );
}
