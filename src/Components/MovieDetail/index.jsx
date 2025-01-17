import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useMovieCredits, useMovieDetail } from "../../Servives/GlobalApi";
import { useMovieTrailer } from "../../Servives/GlobalApi";
import { TailSpin } from "react-loader-spinner";
import { GoDotFill } from "react-icons/go";
import { Rating } from "../Rating";
import { HiMiniPlay } from "react-icons/hi2";

function MovieDetail() {
  const { id } = useParams(); // Lấy ID phim từ URL
  const { movie, loading: loadingDetail } = useMovieDetail(id); // Sử dụng hook để lấy thông tin phim
  const { trailerKey, loading: loadingTrailer } = useMovieTrailer(id); // Sử dụng hook để lấy trailer
  const [showTrailer, setShowTrailer] = useState(false); // State để điều khiển việc hiển thị trailer
  const { movieCredits, loading } = useMovieCredits(id);
  const [activeTab, setActiveTab] = useState("movie");
  if (loadingDetail || loadingTrailer) {
    return (
      <div className="flex justify-center items-center h-screen">
        <TailSpin height="80" width="80" color="#4A90E2" />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="text-white text-center mt-10">
        Không tìm thấy thông tin phim.
      </div>
    );
  }

  // Lấy thông tin đạo diễn và biên kịch từ movieCredits
  const director = movieCredits?.crew?.find(
    (member) => member.job === "Director"
  );
  const screenplay = movieCredits?.crew?.find(
    (member) => member.job === "Screenplay" || member.job === "Writer"
  );

  return (
    <div className="relative min-h-screen text-white ">
      <div
        className="h-full p-8 mx-auto max-w-screen-2xl px-16"
        style={{
          backgroundImage: `
          linear-gradient(
            to right, 
            rgba(31.5, 31.5, 31.5, 1) calc((50vw - 170px) - 340px), 
            rgba(31.5, 31.5, 31.5, 0.84) 50%, 
            rgba(31.5, 31.5, 31.5, 0.84) 100%
          ), 
          url(${import.meta.env.VITE_IMGL_URL}${movie.backdrop_path})
        `,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto flex flex-col lg:flex-row gap-10">
          {/* Poster */}
          <div className="w-full lg:w-[300px] flex justify-center lg:justify-start">
            <div className="relative h-[450px]">
              <img
                src={`${import.meta.env.VITE_IMG_URL}${movie.poster_path}`}
                alt={movie.title}
                className="rounded-md shadow-lg"
                style={{ width: "300px", height: "450px" }}
              />
              <div className="absolute w-full bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center gap-4">
                {trailerKey && (
                  <button
                    onClick={() => setShowTrailer(!showTrailer)}
                    className="px-4 py-2 flex items-center gap-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700"
                  >
                    <HiMiniPlay />{" "}
                    {showTrailer ? "Đóng Trailer" : "Xem Trailer"}
                  </button>
                )}
                <button
                  onClick={() =>
                    alert("Phim đang cập nhật vui lòng xem trailer!")
                  }
                  className="px-4 py-2 flex items-center gap-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700"
                >
                  <HiMiniPlay />
                  Xem Phim
                </button>
              </div>
            </div>
          </div>

          {/* Thông tin phim */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">
              {movie.original_title}: {movie.title}
            </h1>
            <p className="text-gray-100 font-medium text-base mb-2">
              {movie.release_date
                ? new Date(movie.release_date).toLocaleDateString("vi-VN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "N/A"}{" "}
              -{" "}
              {movie.status === "Released" ? "Đã phát hành" : "Đang phát hành"}
            </p>
            <div className="flex items-center mb-2 gap-2">
              <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
              <GoDotFill />
              <p>
                {movie.runtime
                  ? `${Math.floor(movie.runtime / 60)} giờ ${
                      movie.runtime % 60
                    } phút`
                  : "Không có thông tin thời lượng"}
              </p>
            </div>
            <div className="mb-2 flex items-center gap-3">
              <div className="bg-[#131520] flex size-16 items-center rounded-full ">
                <Rating score={movie.vote_average} r={40} strokew="0.6rem" />
              </div>
              <p>
                (Đánh giá {movie.vote_average.toFixed(1)}/10 từ{" "}
                {movie.vote_count} thành viên)
              </p>
            </div>
            <p className="text-gray-300 text-lg italic mb-2">{movie.tagline}</p>
            <h2 className="text-xl font-semibold mb-2">Mô tả:</h2>
            <p className="leading-relaxed mb-6">{movie.overview}</p>
            <div className="flex justify-around border-t border-[gray] pt-4">
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Đạo diễn:</h2>
                <p>{director ? director.name : "Không có thông tin"}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Biên kịch:</h2>
                <p>{screenplay ? screenplay.name : "Không có thông tin"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full p-4">
        <div className="flex justify-start gap-4">
          {/* Tab chọn */}
          <button
            onClick={() => setActiveTab("movie")}
            className={`px-6 py-2 text-lg font-semibold ${
              activeTab === "movie" ? "text-blue-600" : "text-gray-400"
            }`}
          >
            Thông Tin Phim
          </button>
          <button
            onClick={() => setActiveTab("cast")}
            className={`px-6 py-2 text-lg font-semibold ${
              activeTab === "cast" ? "text-blue-600" : "text-gray-400"
            }`}
          >
            Dàn Diễn Viên
          </button>
        </div>

        {/* Nội dung tab */}
        {activeTab === "movie" ? (
          <div className="mt-4">
            <h2 className="text-2xl font-bold">{movie.title}</h2>
            <p className="text-lg text-gray-300">{movie.tagline}</p>
            <p className="mt-2 text-lg">{movie.overview}</p>
            <p className="mt-2">Ngày phát hành: {movie.release_date}</p>
            <p className="mt-2">Thời gian: {movie.runtime} phút</p>
            <p className="mt-2">Điểm IMDB: {movie.vote_average}</p>
          </div>
        ) : (
          <div className="mt-4">
            <h2 className="text-2xl font-bold">Dàn Diễn Viên</h2>
            <div className="flex overflow-x-auto whitespace-nowrap space-x-6 py-4">
              {movieCredits.cast.map((actor, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center bg-black bg-opacity-35 gap-2 w-[160px]"
                >
                  {/* Ảnh diễn viên */}
                  <div>
                    <img
                      src={`${import.meta.env.VITE_IMGS_URL}${
                        actor.profile_path
                      }`}
                      alt={actor.name}
                      className="w-full h-[175px] rounded-lg object-cover shadow-lg"
                    />
                  </div>
                  <div className="text-center w-full">
                    <h3 className="text-lg font-semibold text-white">
                      {actor.name}
                    </h3>
                    <p className="text-sm text-gray-300 ">
                      {actor.character}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Trailer */}
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
