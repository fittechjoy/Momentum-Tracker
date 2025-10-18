// src/components/ExerciseList.jsx
export default function ExerciseList({ exercises }) {
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Exercise Results</h2>
      {exercises.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {exercises.map((exercise) => (
            <div
              key={exercise.id}
              className="p-4 bg-white rounded-lg shadow hover:shadow-md transition"
            >
              <img
                src={exercise.gifUrl}
                alt={exercise.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h3 className="text-lg font-semibold mt-2 capitalize">
                {exercise.name}
              </h3>
              <p className="text-sm text-gray-600">
                <strong>Body Part:</strong> {exercise.bodyPart}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Target:</strong> {exercise.target}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No exercises found. Try searching above!</p>
      )}
    </div>
  );
}
