import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { HiOutlinePlayCircle } from "react-icons/hi2";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { useAccountDetails, useFavoriteMovies } from "../../Servives/Auth";
import { useGetPopular } from "../../Servives/GlobalApi";

function PopularMovies() {
  const sessionId = localStorage.getItem("sessionId");
  const { accountDetails } = useAccountDetails(sessionId);
  const { dataPopular } = useGetPopular();
  const { favorites, handleFavoriteToggle } = useFavoriteMovies(
    sessionId,
    accountDetails?.id
  );
  const navigate = useNavigate();

  // State lưu trữ background image
  const [backgroundImage, setBackgroundImage] = useState("");

  // Sử dụng useEffect để thiết lập ảnh nền ban đầu khi dữ liệu có sẵn
  useEffect(() => {
    if (dataPopular && dataPopular.length > 0) {
      setBackgroundImage(
        `${import.meta.env.VITE_IMGL_URL}${dataPopular[0]?.backdrop_path}`
      ); // Set ảnh của item đầu tiên
    }
  }, [dataPopular]);

  const handleMouseEnter = (backdropPath) => {
    setBackgroundImage(`url(${import.meta.env.VITE_IMGL_URL}${backdropPath})`); // Cập nhật background khi hover vào item
  };

  const handleMouseLeave = () => {
    if (dataPopular && dataPopular.length > 0) {
      setBackgroundImage(
        `${import.meta.env.VITE_IMGL_URL}${dataPopular[0]?.backdrop_path}`
      ); // Quay lại ảnh nền ban đầu
    }
  };

  return (
    <div
      className="p-4 scroll-container mt-8 rounded-lg"
      style={{
        backgroundImage: backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }} // Áp dụng background cho container
    >
      {/* Lớp phủ màu tím */}
      <div
        className="absolute inset-0 bg-[#131520] opacity-50" // Tạo lớp phủ màu tím với độ trong suốt
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "#131520",
        }}
      ></div>
      <h3 className="text-2xl font-bold my-2 px-4 z-30">What's Popular</h3>

      {/* Thanh cuộn ngang */}
      <div className="flex gap-4 px-4 z-10">
        {dataPopular.map((movie) => (
          <div
            key={movie.id}
            className="relative movie-item text-white rounded-md hover:rounded-md p-2 text-center transition-all"
            style={{ minWidth: "200px" }}
            onMouseEnter={() => handleMouseEnter(movie.backdrop_path)} // Hover vào item để thay đổi background
            onMouseLeave={handleMouseLeave} // Khi rời khỏi item, quay lại ảnh nền ban đầu
          >
            <div className="relative group overflow-hidden">
              <img
                src={`${import.meta.env.VITE_IMG_URL}${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-[250px] object-cover rounded-md mb-2 transition-transform duration-300 ease-in-out group-hover:scale-105"
              />
              {/* Điểm đánh giá */}
              <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-yellow-400 flex items-center gap-1 px-2 py-1 rounded-md shadow-md">
                <FaStar />
                <span className="text-sm font-semibold">
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>
              {/* Nút Play */}
              <div
                className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                onClick={() => navigate(`/movie/${movie.id}`)}
              >
                <HiOutlinePlayCircle className="text-white text-5xl" />
              </div>
            </div>
            <h4 className="font-bold truncate">{movie.title}</h4>
            <p>Lượt xem: {movie.popularity}</p>

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
  );
}

export default PopularMovies;
