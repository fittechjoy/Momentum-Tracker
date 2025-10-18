import { useEffect, useState } from "react";

export default function SearchExercises() {
  const [exercises, setExercises] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const API_KEY = import.meta.env.VITE_API_NINJAS_KEY;

  useEffect(() => {
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

  // 💥 Add this error block ABOVE the main return
  if (error)
    return (
      <div className="text-center text-red-600 p-6 bg-red-50 rounded-lg mt-8 shadow-md">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="bg-white shadow-md rounded-xl p-6 mt-8">
      <h2 className="text-2xl font-semibold text-blue-700 mb-4">Exercise Library</h2>

      <input
        type="text"
        id="search"
        name="search"
        placeholder="Search exercises..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
      />

      {loading && <p>Loading exercises...</p>}

      <ul className="space-y-3 max-h-96 overflow-y-auto">
        {exercises.map((exercise) => (
          <li
            key={exercise.name}
            className="border-b border-gray-200 pb-2 last:border-b-0"
          >
            <p className="font-medium text-gray-800">{exercise.name}</p>
            <p className="text-sm text-gray-600">
              <strong>Type:</strong> {exercise.type} |{" "}
              <strong>Muscle:</strong> {exercise.muscle}
            </p>
          </li>
        ))}
      </ul>

      {!loading && !error && exercises.length === 0 && search.trim() !== "" && (
        <p className="text-gray-500">No exercises found.</p>
      )}
    </div>
  );
}
