import React, { useEffect, useState } from "react";
import { useMoviesByGenre } from "../../Servives/GlobalApi";

function MoviesByGenre({ selectedGenre,genreName  }) {
  const { movies } = useMoviesByGenre(selectedGenre); // Fetch phim theo genre đã chọn

  return (
    <div className="p-4">
      <h3 className="text-2xl font-bold mb-4">{genreName}</h3>

      {/* Hiển thị phim */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {!movies.length ? (
          <p>Loading...</p>
        ) : (
          movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 text-white rounded-md p-2 text-center hover:bg-gray-600 transition-all"
            >
              <img
                src={`${import.meta.env.VITE_IMG_URL}${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-[300px] object-cover rounded-md mb-2"
              />
              <h4 className="font-bold">{movie.title}</h4>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MoviesByGenre;
