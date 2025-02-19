function GenresList({ genres, onSelectGenre }) {

  const handleSelectGenre = (id, name) => {
    onSelectGenre(id, name); // Cập nhật genre đã chọn
  };

  return (
    <div className="p-1">
      <div className="grid grid-cols-3 gap-4">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => handleSelectGenre(genre.id, genre.name)} // Xử lý chọn genre
            className="bg-gray-700 text-white p-2 text-sm rounded-md hover:bg-gray-600 transition-all"
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default GenresList;
