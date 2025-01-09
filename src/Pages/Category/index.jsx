import React, { useState } from "react";
import { useGenres, useTvGenres } from "../../Servives/GlobalApi";
import GenresList from "../../Components/GenresList";
import MoviesByGenre from "../../Components/MoviesByGenre";

function Category() {
  const { genres } = useGenres();
  const {tvGenres} = useTvGenres();
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [genreName, setGenreName] = useState("");

  const handleSelectGenre = (id, name) => {
    setSelectedGenre(id);
    setGenreName(name); // Cập nhật tên genre khi người dùng chọn
  };

  return (
    <div className="px-16">
      <h3 className="text-2xl font-bold mb-4">Tất cả</h3>
      {/* Hiển thị danh sách genres */}
      <GenresList genres={genres} onSelectGenre={handleSelectGenre} />
      <GenresList genres={tvGenres} onSelectGenre={handleSelectGenre} />

      {/* Hiển thị danh sách phim theo genre đã chọn */}
      {selectedGenre && <MoviesByGenre selectedGenre={selectedGenre} genreName={genreName}/>}
    </div>
  );
}

export default Category;
