import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlinePlayCircle } from "react-icons/hi2";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { useAccountDetails, useFavoriteMovies } from "../../Servives/Auth";
import { useGetPopular } from "../../Servives/GlobalApi";
import { Rating } from "../Rating";

function PopularMovies() {
  const sessionId = localStorage.getItem("sessionId");
  const { accountDetails } = useAccountDetails(sessionId);
  const { dataPopular } = useGetPopular();
  const { favorites, handleFavoriteToggle } = useFavoriteMovies(
    sessionId,
    accountDetails?.id
  );
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState(1);

  // State lưu trữ background image
  const [backgroundImage, setBackgroundImage] = useState("");

  // State lưu trữ danh sách phim đã sắp xếp
  const [sortedMovies, setSortedMovies] = useState([]);

  // Sắp xếp danh sách phim khi activeButton thay đổi
  useEffect(() => {
    if (dataPopular && dataPopular.length > 0) {
      // Sắp xếp theo ngày hoặc điểm đánh giá
      const sorted = [...dataPopular].sort((a, b) => {
        if (activeButton === 1) {
          // Sắp xếp theo ngày (Mới nhất)
          return new Date(b.release_date) - new Date(a.release_date);
        } else if (activeButton === 2) {
          // Sắp xếp theo đánh giá cao
          return b.vote_average - a.vote_average;
        }
        return 0;
      });
      setSortedMovies(sorted);

      // Thiết lập ảnh nền ban đầu
      setBackgroundImage(
        `${import.meta.env.VITE_IMGL_URL}${sorted[0]?.backdrop_path}`
      );
    }
  }, [dataPopular, activeButton]);

  const handleMouseEnter = (backdropPath) => {
    setBackgroundImage(`url(${import.meta.env.VITE_IMGL_URL}${backdropPath})`);
  };

  const handleMouseLeave = () => {
    if (sortedMovies && sortedMovies.length > 0) {
      setBackgroundImage(
        `${import.meta.env.VITE_IMGL_URL}${sortedMovies[0]?.backdrop_path}`
      );
    }
  };

  return (
    <div className="mt-8">
      <div className="flex items-center gap-8">
        <h3 className="relative text-2xl font-bold my-2 z-30">
          What's Popular
        </h3>
        <div className="relative z-10 flex w-56 h-8 bg-transparent rounded-3xl overflow-hidden border-[white] border-[1.3px]">
          {/* Nền trượt */}
          <div
            className={`absolute top-0 left-0 w-1/2 h-full bg-white rounded-3xl transition-all duration-300 ease-in-out ${
              activeButton === 2 ? "translate-x-full" : ""
            }`}
          ></div>

          <div className="flex justify-center items-center gap-2 w-full h-full cursor-pointer">
            <div
              className={`relative flex-1 text-center z-10 font-medium ${
                activeButton === 1
                  ? "text-green-600 bg-transparent"
                  : "text-white bg-transparent"
              }`}
              onClick={() => setActiveButton(1)}
            >
              Mới nhất
            </div>

            <div
              className={`relative flex-1 text-center z-10 font-medium ${
                activeButton === 2
                  ? "text-green-600 bg-transparent"
                  : "text-white bg-transparent"
              }`}
              onClick={() => setActiveButton(2)}
            >
              Đánh giá cao
            </div>
          </div>
        </div>
      </div>
      <div
        className="p-4 scroll-container mt-4 rounded-lg"
        style={{
          backgroundImage: backgroundImage,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        {/* Lớp phủ màu tím */}
        <div
          className="absolute inset-0 bg-[#131520] opacity-50"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#131520",
            zIndex: 1,
          }}
        ></div>

        {/* Thanh cuộn ngang */}
        <div className="flex gap-4 px-4 z-10">
          {sortedMovies.map((movie) => (
            <div
              key={movie.id}
              className="relative movie-item text-white rounded-md hover:rounded-md p-2 text-center transition-all"
              style={{ minWidth: "200px" }}
              onMouseEnter={() => handleMouseEnter(movie.backdrop_path)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative group overflow-hidden mb-3">
                <img
                  src={`${import.meta.env.VITE_IMGS_URL}${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-[250px] object-cover rounded-md transition-transform duration-300 ease-in-out group-hover:scale-105"
                />

                {/* Nút Play */}
                <div
                  className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                  onClick={() => navigate(`/movie/${movie.id}`)}
                >
                  <HiOutlinePlayCircle className="text-white text-5xl" />
                </div>
              </div>
              {/* Điểm đánh giá */}
              <div className="absolute z-10 bottom-[50px] left-4 size-10 bg-[#131520] flex items-center justify-center rounded-full ">
                <Rating score={movie.vote_average} strokew="0.6rem" r={40} />
              </div>
              <h4 className="font-bold truncate">{movie.title}</h4>
              <p className="text-gray-100">
                {movie.release_date
                  ? new Date(movie.release_date).toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "N/A"}
              </p>

              {/* Icon yêu thích */}
              <div
                className="absolute top-2 right-2 text-white cursor-pointer"
                onClick={() => handleFavoriteToggle(movie.id)}
              >
                {favorites.has(movie.id) ? (
                  <HiHeart className="text-red-500 text-3xl" />
                ) : (
                  <HiOutlineHeart className="text-gray-300 text-3xl" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PopularMovies;
