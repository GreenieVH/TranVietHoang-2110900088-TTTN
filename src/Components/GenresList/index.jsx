import React from "react";

function GenresList({ genres, onSelectGenre }) {

  const handleSelectGenre = (id, name) => {
    onSelectGenre(id, name); // Cập nhật genre đã chọn
  };

  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-4">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => handleSelectGenre(genre.id, genre.name)} // Xử lý chọn genre
            className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-all"
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default GenresList;
