import { useEffect, useState } from "react";

export default function ExerciseList() {
  const [exercises, setExercises] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        // ✅ use "exerciseinfo" endpoint which includes names and images
        const response = await fetch("https://wger.de/api/v2/exerciseinfo/?language=2&limit=50");

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        console.log("Fetched exercises:", data);

        setExercises(data.results || []);
      } catch (err) {
        console.error("Error fetching exercises:", err);
        setError("Failed to load exercises. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  const filteredExercises = exercises.filter((ex) =>
    ex.name?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p className="text-center text-gray-600">Loading exercises...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="bg-white shadow-md rounded-xl p-6 mt-8">
      <h2 className="text-2xl font-semibold text-blue-700 mb-4">Exercise Library</h2>

      <input
        type="text"
        placeholder="Search exercises..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
      />

      {filteredExercises.length > 0 ? (
        <ul className="space-y-3 max-h-96 overflow-y-auto">
          {filteredExercises.map((exercise) => (
            <li key={exercise.id} className="border-b border-gray-200 pb-2 last:border-b-0">
              <p className="font-medium text-gray-800">{exercise.name}</p>

              {exercise.description ? (
                <p
                  className="text-sm text-gray-600"
                  dangerouslySetInnerHTML={{ __html: exercise.description }}
                />
              ) : (
                <p className="text-sm text-gray-400">No description available.</p>
              )}

              {exercise.images?.length > 0 && (
                <img
                  src={exercise.images[0].image}
                  alt={exercise.name}
                  className="mt-2 rounded-lg"
                />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No exercises found.</p>
      )}
    </div>
  );
}
