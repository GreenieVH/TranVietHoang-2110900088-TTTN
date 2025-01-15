import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGenres, useTvGenres } from "../../Servives/GlobalApi";
import MoviesByGenre from "../../Components/MoviesByGenre";

function Movies() {
  const { genreId } = useParams(); // Lấy genreId từ URL
  const { genres } = useGenres();
  const { tvGenres } = useTvGenres();
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [genreName, setGenreName] = useState("");

  useEffect(() => {
    const genre = [...genres, ...tvGenres].find(
      (g) => g.id === parseInt(genreId)
    );
    if (genre) {
      setSelectedGenre(genre.id);
      setGenreName(genre.name);
    }
  }, [genreId, genres, tvGenres]);

  return (
    <div className="px-16">
      {selectedGenre && <MoviesByGenre selectedGenre={selectedGenre} genreName={genreName} />}
    </div>
  );
}

export default Movies;
