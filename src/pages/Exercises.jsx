
import { useState, useEffect } from "react";

export default function Exercises() {
  const [exercises, setExercises] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_API_NINJAS_KEY; // ✅ Correct syntax

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
    <div className="max-w-6xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Exercise Library</h1>

      <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-5 shadow-soft">
        <input
          type="text"
          placeholder="Search exercises…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg bg-slate-900/70 border border-white/10 px-3 py-2 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />

        {loading && <p className="mt-4 text-slate-300">Loading exercises...</p>}
        {error && <p className="mt-4 text-red-500">{error}</p>}

        {!loading && !error && exercises.length > 0 && (
          <ul className="mt-4 space-y-3 max-h-96 overflow-y-auto">
            {exercises.map((ex) => (
              <li
                key={ex.name}
                className="border-b border-white/10 pb-2 last:border-0"
              >
                <p className="font-medium text-slate-100">{ex.name}</p>
                <p className="text-sm text-slate-300">
                  <strong>Type:</strong> {ex.type} |{" "}
                  <strong>Muscle:</strong> {ex.muscle}
                </p>
              </li>
            ))}
          </ul>
        )}

        {!loading &&
          !error &&
          exercises.length === 0 &&
          search.trim() !== "" && (
            <p className="mt-4 text-slate-400">No exercises found.</p>
          )}
      </div>
    </div>
  );
}
