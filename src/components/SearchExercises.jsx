import { useEffect, useState } from "react";

export default function SearchExercises() {
  const [exercises, setExercises] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const API_KEY = import.meta.env.VITE_API_NINJAS_KEY;

  useEffect(() => {
    // Only fetch when search is not empty
    if (search.trim() === "") {
      setExercises([]);
      return;
    }

    const fetchExercises = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          `https://api.api-ninjas.com/v1/exercises?name=${search}`,
          { headers: { "X-Api-Key": API_KEY } }
        );

        if (!response.ok) throw new Error("API request failed");
        const data = await response.json();
        setExercises(data);
      } catch (err) {
        setError("Failed to load exercises. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [search]);

  return (
    <div className="bg-slate-800 p-4 rounded-xl shadow border border-slate-700">
      <h2 className="text-2xl font-semibold text-blue-400 mb-4">
        Exercise Library
      </h2>

      <input
        type="text"
        id="search"
        name="search"
        placeholder="Search exercises..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-slate-900 border border-slate-700 text-slate-200 px-3 py-2 rounded mb-4 focus:ring-2 focus:ring-blue-500"
      />

      {loading && <p className="text-slate-400">Loading exercises...</p>}
      {error && <p className="text-red-400">{error}</p>}

      <ul className="space-y-3 max-h-96 overflow-y-auto">
        {exercises.map((exercise, idx) => (
          <li
            key={idx}
            className="border-b border-slate-700 pb-2 last:border-none"
          >
            <p className="font-medium text-slate-200">{exercise.name}</p>
            <p className="text-sm text-slate-400">
              <strong>Type:</strong> {exercise.type} |{" "}
              <strong>Muscle:</strong> {exercise.muscle}
            </p>
          </li>
        ))}
      </ul>

      {!loading && !error && exercises.length === 0 && search.trim() !== "" && (
        <p className="text-slate-400">No exercises found.</p>
      )}
    </div>
  );
}
