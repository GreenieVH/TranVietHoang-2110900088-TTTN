import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useMovieDetail } from "../../Servives/GlobalApi";
import { useMovieTrailer } from "../../Servives/GlobalApi";

function MovieDetail() {
  const { id } = useParams(); // Lấy ID phim từ URL
  const { movie, loading: loadingDetail } = useMovieDetail(id); // Sử dụng hook để lấy thông tin phim
  const { trailerKey, loading: loadingTrailer } = useMovieTrailer(id); // Sử dụng hook để lấy trailer
  const [showTrailer, setShowTrailer] = useState(false); // State để điều khiển việc hiển thị trailer

  if (loadingDetail || loadingTrailer) {
    return <div className="text-white text-center mt-10">Đang tải...</div>;
  }

  if (!movie) {
    return (
      <div className="text-white text-center mt-10">
        Không tìm thấy thông tin phim.
      </div>
    );
  }

  return (
    <div className="p-4 px-16 text-white">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Ảnh Poster */}
        <div className="lg:w-1/3">
          <img
            src={`${import.meta.env.VITE_IMG_URL}${movie.poster_path}`}
            alt={movie.title}
            className="w-full rounded-md shadow-lg"
          />
        </div>

        {/* Thông tin phim */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
          <p className="mb-2 text-lg">Ngày phát hành: {movie.release_date}</p>
          <p className="mb-2 text-lg">Thời lượng: {movie.runtime} phút</p>
          <p className="mb-4 text-lg">
            Đánh giá: ⭐ {movie.vote_average.toFixed(1)}
          </p>
          <h2 className="text-2xl font-bold mb-2">Nội dung:</h2>
          <p className="leading-relaxed">{movie.overview}</p>

          {/* Thể loại */}
          <h2 className="text-2xl font-bold mt-4">Thể loại:</h2>
          <div className="flex gap-2 flex-wrap mt-2">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="px-3 py-1 bg-gray-800 rounded-md shadow-md text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>

          {trailerKey ? (
            <button
              onClick={() => setShowTrailer(!showTrailer)}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700"
            >
              {showTrailer ? "Đóng Trailer" : "Xem Trailer"}
            </button>
          ) : (
            <p className="mt-4 text-gray-400">Trailer hiện không khả dụng.</p>
          )}
        </div>
      </div>

      {/* Hiển thị Trailer */}
      {showTrailer && trailerKey && (
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Trailer</h3>
          <iframe
            width="100%"
            height="500"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title={`${movie.title} Trailer`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-md shadow-md"
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default MovieDetail;
