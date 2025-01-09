import React from "react";

function GenresList({ genres, onSelectGenre }) {
  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-4">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => onSelectGenre(genre.id,genre.name)}
            className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-all"
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default GenresList;
