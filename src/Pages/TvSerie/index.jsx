import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGenres, useTvGenres } from "../../Servives/GlobalApi";
import TvByGrenre from "../../Features/TvByGrenre";

function TvSerie() {
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
    <div className="px-16 max-w-screen-2xl mx-auto min-h-screen">
      {selectedGenre && <TvByGrenre selectedGenre={selectedGenre} genreName={genreName} />}
    </div>
  );
}

export default TvSerie;
