import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useMovieCredits, useMovieDetail } from "../../Servives/GlobalApi";
import { useMovieTrailer } from "../../Servives/GlobalApi";
import { TailSpin } from "react-loader-spinner";
import { GoDotFill } from "react-icons/go";
import { Rating } from "../../Components/common/Rating";
import { HiMiniPlay } from "react-icons/hi2";
import { FaRegDotCircle } from "react-icons/fa";
import Remark from "../../Components/ui/Remark";

function MovieDetail() {
  const { id } = useParams(); // Lấy ID phim từ URL
  const { movie, loading: loadingDetail } = useMovieDetail(id); // Sử dụng hook để lấy thông tin phim
  const { trailerKey, loading: loadingTrailer } = useMovieTrailer(id); // Sử dụng hook để lấy trailer
  const [showTrailer, setShowTrailer] = useState(false); // State để điều khiển việc hiển thị trailer
  const { movieCredits, loading } = useMovieCredits(id);
  const [activeTab, setActiveTab] = useState("movie");
  const [visibleCount, setVisibleCount] = useState(10);
  const displayNames = new Intl.DisplayNames(["vi"], { type: "language" });

  if (loadingDetail || loadingTrailer || loading) {
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
          <div className={`flex-1 ${showTrailer ? "hidden" : ""}`}>
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
          {/* Trailer */}
          <div className={`${!showTrailer ? "hidden" : "flex-1"} `}>
            {showTrailer && trailerKey && (
              <div className="flex flex-col transform transition-all duration-400 ease-in-out animate-show">
                <iframe
                  width="100%"
                  height="450"
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
        </div>
      </div>
      <div className="w-full p-8 mx-auto max-w-screen-2xl px-16">
        <div className="flex justify-start gap-4">
          {/* Tab chọn */}
          <div
            onClick={() => setActiveTab("movie")}
            className={`px-4 py-2 text-lg font-semibold border-b-2 cursor-pointer ${
              activeTab === "movie"
                ? "text-green-500 border-green-500"
                : "text-white border-transparent"
            }`}
          >
            Thông Tin Phim
          </div>
          <div
            onClick={() => setActiveTab("cast")}
            className={`px-4 py-2 text-lg font-semibold border-b-2 cursor-pointer ${
              activeTab === "cast"
                ? "text-green-500 border-green-500"
                : "text-white border-transparent"
            }`}
          >
            Dàn Diễn Viên
          </div>
        </div>

        {/* Nội dung tab */}
        <div className="bg-[#25283d] p-6 py-4">
          {activeTab === "movie" ? (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2 text-lg">
                <div className="flex items-center gap-2">
                  <FaRegDotCircle className="text-green-600" />
                  <span>
                    Trạng thái:{" "}
                    {movie.status === "Released"
                      ? "Đã phát hành"
                      : "Chưa phát hành"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <FaRegDotCircle className="text-green-600" />
                  <span>
                    Thể loại:{" "}
                    {movie.genres.map((genre) => genre.name).join(", ")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaRegDotCircle className="text-green-600" />
                  <span>
                    Đạo diễn: {director ? director.name : "Không có thông tin"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaRegDotCircle className="text-green-600" />
                  <span>
                    Quốc gia:{" "}
                    {movie.production_countries.map((c) => c.name).join(", ")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaRegDotCircle className="text-green-600" />
                  <span>Số lượt đánh giá: {movie.vote_count}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 text-lg">
                <div className="flex items-center gap-2">
                  <FaRegDotCircle className="text-green-600" />
                  <span>Thời lượng: {movie.runtime} phút</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaRegDotCircle className="text-green-600" />
                  <span>18+: {movie.adult ? "Có" : "Không"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaRegDotCircle className="text-green-600" />
                  <span>Ngôn ngữ:  {displayNames.of(movie.original_language) || "Không xác định"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaRegDotCircle className="text-green-600" />
                  <span>Điểm IMDB: {movie.vote_average}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-4">
              <h2 className="text-2xl font-bold">Dàn Diễn Viên</h2>
              <div className="scroll-container">
                <div className="flex gap-4 px-4 z-10">
                  {movieCredits.cast
                    .slice(0, visibleCount)
                    .map((actor, index) => (
                      <div
                        key={index}
                        className="relative movie-item text-start text-white rounded-md hover:rounded-md transition-all border-gray-700 shadow-lg border-[1px] pb-2"
                        style={{ minWidth: "140px", minHeight: "175px" }}
                      >
                        <div className="relative group overflow-hidden mb-3">
                          <img
                            src={`${import.meta.env.VITE_IMGS_URL}${
                              actor.profile_path
                            }`}
                            alt={actor.name}
                            className="w-full h-[175px] object-cover rounded-md rounded-b-none transition-transform duration-300 ease-in-out group-hover:scale-105"
                          />
                        </div>
                        <h3 className="px-2 text-base font-semibold text-white">
                          {actor.name}
                        </h3>
                        <p className="px-2 text-sm text-gray-300">
                          {actor.character}
                        </p>
                      </div>
                    ))}
                  {visibleCount < movieCredits.cast.length && (
                    <div className="text-center min-w-[150px] min-h-[175px] flex items-center justify-center mt-4">
                      <button
                        onClick={() =>
                          setVisibleCount((prevCount) => prevCount + 5)
                        }
                        className="px-4 py-2 bg-[#0C0F1B] bg-opacity-50 text-white rounded-md shadow-md hover:bg-opacity-100 transition-all"
                      >
                        Xem thêm
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Remark />

    </div>
  );
}

export default MovieDetail;
