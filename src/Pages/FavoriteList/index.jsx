import React, { useState } from "react";
import {
  useAccountDetails,
  useFavoriteList,
  useFavoriteMovies,
} from "../../Servives/Auth";
import { TailSpin } from "react-loader-spinner";
import { HiOutlineStar, HiPlay } from "react-icons/hi2";
import { HiHeart, HiOutlineHeart, HiX } from "react-icons/hi";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { Rating } from "../../Components/Rating";
import { useNavigate } from "react-router-dom";

function FavoriteList() {
  const navigate = useNavigate();
  const sessionId = localStorage.getItem("sessionId");
  const { accountDetails, loading: loadingAccount } =
    useAccountDetails(sessionId);
  const { favorites: editFavorite, handleFavoriteToggle } = useFavoriteMovies(
    sessionId,
    accountDetails?.id
  );
  const { movies, tvShows, loading, error } = useFavoriteList(
    accountDetails?.id,
    sessionId
  );

  if (!sessionId) {
    navigate(`/login`);
  }

  const [activeTab, setActiveTab] = useState("movie"); // "movie" or "tv"

  const handleItemClick = (activeTab,item) => {
    if (activeTab === "movie") {
      navigate(`/movie/${item.id}`); // Điều hướng đến component Movie
    } else{
      navigate(`/tvserie/${item.id}`); // Điều hướng đến component TV Series
    } 
  };

  if (loading || loadingAccount)
    return (
      <div className="flex justify-center items-center h-screen">
        <TailSpin height="80" width="80" color="#4A90E2" />
      </div>
    );

  if (error) return <div>Error: {error}</div>;

  const activeList = activeTab === "movie" ? movies : tvShows;

  return (
    <div className="container mx-auto max-w-screen-2xl px-16">
      <h1 className="text-2xl font-bold mb-4">Danh sách yêu thích</h1>

      {/* Tab Controls */}
      <div className="flex gap-4 mb-6">
        <div
          onClick={() => setActiveTab("movie")}
          className={`py-2 px-2 ${
            activeTab === "movie"
              ? "border-b-2 cursor-pointer border-green-400 text-green-400"
              : "text-white cursor-pointer"
          }`}
        >
          Movies
          <span
            className={`inline-flex items-center justify-center ml-2 w-6 h-6 text-center rounded-full border-2 ${
              movies.length > 0
                ? "border-white text-green-400"
                : "border-green-400 text-white"
            }`}
          >
            {movies.length > 0 ? movies.length : 0}
          </span>
        </div>
        <div
          onClick={() => setActiveTab("tv")}
          className={`py-2 px-2 ${
            activeTab === "tv"
              ? "border-b-2 cursor-pointer border-green-400 text-green-400"
              : "text-white cursor-pointer"
          }`}
        >
          TV Shows
          <span
            className={`inline-flex items-center justify-center ml-2 w-6 h-6 text-center rounded-full border-2 ${
              tvShows.length > 0
                ? "border-white text-green-400"
                : "border-green-400 text-white"
            }`}
          >
            {tvShows.length > 0 ? tvShows.length : 0}
          </span>
        </div>
      </div>

      {/* List */}
      <ul className="space-y-4">
        {activeList.map((item) => (
          <li
            key={item.id}
            className="flex h-[220px] items-center gap-4 border border-gray-400 rounded-xl"
          >
            {/* Image */}
            <div
              className="relative w-32 h-full overflow-hidden cursor-pointer"
              onClick={() => handleItemClick(activeTab,item)}
            >
              <img
                src={`${import.meta.env.VITE_IMGS_URL}${item.poster_path}`}
                alt={item.title}
                className="w-full h-full object-cover rounded-l-xl"
              />
              {/* HiPlay Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <HiPlay className="text-white text-5xl bg-black bg-opacity-50 p-2 rounded-full" />
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 pr-6">
              <div className="flex items-center gap-4 mb-4">
                {/* Rating */}
                <div className="z-10 w-9 h-9 bg-black flex items-center justify-center rounded-full">
                  <Rating score={item.vote_average} />
                </div>
                {/* Title and Date */}
                <div>
                  <h2
                    className="text-xl font-semibold cursor-pointer"
                    onClick={() => handleItemClick(activeTab,item)}
                  >
                    {item.title || item.name}
                    <span className="text-gray-400 italic ml-3">
                      ({item.original_name || item.original_title})
                    </span>
                  </h2>
                  <p className="text-gray-500">
                    Ngày phát hành:{" "}
                    {item.release_date
                      ? new Date(
                          item.release_date || item.first_air_date
                        ).toLocaleDateString("vi-VN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : new Date(item.first_air_date).toLocaleDateString(
                          "vi-VN",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                  </p>
                </div>
              </div>

              <p className="mt-2 text-white line-clamp-3">
                {item.overview || "Không có mô tả"}
              </p>

              {/* Buttons */}
              <div className="flex gap-2 mt-4">
                <div className="flex gap-2 items-center">
                  <div className="p-2 rounded-full text-white hover:bg-[#212536] border-[gray] border">
                    <HiOutlineStar className="text-2xl" />
                  </div>
                  <div className="text-base font-medium">Đánh giá!</div>
                </div>
                <div className="flex gap-2 items-center">
                  <div
                    className="p-2 rounded-full text-white hover:bg-[#212536] border-[gray] border"
                    onClick={() => handleFavoriteToggle(item.id, activeTab)}
                  >
                    {editFavorite.has(item.id) ? (
                      <HiHeart className="text-red-500 text-2xl" />
                    ) : (
                      <HiOutlineHeart className="text-gray-300 text-2xl" />
                    )}
                  </div>
                  <div className="text-base font-medium">Yêu thích</div>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="p-2 rounded-full text-white hover:bg-[#212536] border-[gray] border">
                    <MdFormatListBulletedAdd className="text-2xl" />
                  </div>
                  <div className="text-base font-medium">
                    Thêm vào danh sách
                  </div>
                </div>
                {/* <div className="flex gap-2 items-center">
                  <div
                    className="p-2 rounded-full text-white hover:bg-[#212536] border-[gray] border"
                    onClick={() => handleFavoriteToggle(item.id,activeTab)}
                  >
                    <HiX className="text-2xl" />
                  </div>
                  <div className="text-base font-medium">Loại bỏ</div>
                </div> */}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavoriteList;
