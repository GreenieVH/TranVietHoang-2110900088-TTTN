import { useEffect, useRef, useState } from "react";
import {
  useFavoriteList,
  useFavoriteMovies,
  useFetchMovieLists,
} from "../../Servives/Auth";
import { TailSpin } from "react-loader-spinner";
import { HiOutlineStar, HiPlay } from "react-icons/hi2";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { Rating } from "../../Components/common/Rating";
import { useNavigate } from "react-router-dom";
import DropdownLists from "../../Components/ui/DropdownLists";
import RatingComponent from "../../Components/ui/RatingComponent";

function FavoriteList() {
  const navigate = useNavigate();
  const sessionId = localStorage.getItem("sessionId");
  const accountId = localStorage.getItem("accountId");
  const dropdownRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(null);
  const [isRate, setIsRate] = useState(null);
  const { handleFavoriteToggle, favoritesUpdated } = useFavoriteMovies(
    sessionId,
    accountId
  );
  const { movies, loading, tvShows } = useFavoriteList(
    accountId,
    sessionId,
    1,
    favoritesUpdated
  );
  const {
    lists,
    loading: LoadingMovieList,
    setLists,
    refetch,
  } = useFetchMovieLists(sessionId, accountId);

  const [activeTab, setActiveTab] = useState("movie"); // "movie" or "tv"

  const handleItemClick = (activeTab, item) => {
    if (activeTab === "movie") {
      navigate(`/movie/${item.id}`); // Điều hướng đến component Movie
    } else {
      navigate(`/tvserie/${item.id}`); // Điều hướng đến component TV Series
    }
  };
  const handleToggle = (id) => {
    if (!sessionId) {
      alert("Đăng nhập để tiếp tục!");
      return;
    }
    setShowDropdown((prevId) => (prevId === id ? null : id));
  };
  const handleRate = (id) => {
    if (!sessionId) {
      alert("Đăng nhập để tiếp tục!");
      return;
    }
    setIsRate((prevId) => (prevId === id ? null : id));
  };

  const activeList = activeTab === "movie" ? movies : tvShows;
  if (!sessionId) {
    return (
      <div className="min-h-screen w-full text-center pt-7 text-2xl font-bold">
        Vui lòng đăng nhập để sử dụng!
      </div>
    );
  }
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <TailSpin height="80" width="80" color="#4A90E2" />
      </div>
    );

  return (
    <div className="container mx-auto max-w-screen-2xl px-16 min-h-screen">
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
        {activeList.map((item) => {
          const isFavorite = activeList.some(
            (favMovie) => favMovie.id === item.id
          );
          return (
            <li
              key={item.id}
              className="flex h-[220px] items-center gap-4 border border-gray-400 rounded-xl"
            >
              {/* Image */}
              <div
                className="relative w-32 h-full overflow-hidden cursor-pointer"
                onClick={() => handleItemClick(activeTab, item)}
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
                  <div className="z-10 size-10 bg-[#11131d] flex items-center justify-center rounded-full">
                    <Rating score={item.vote_average} strokew="0.6rem" r={40} />
                  </div>
                  {/* Title and Date */}
                  <div>
                    <h2
                      className="text-xl font-semibold cursor-pointer"
                      onClick={() => handleItemClick(activeTab, item)}
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
                    <div
                      className="p-2 relative rounded-full text-white hover:bg-[#212536] cursor-pointer border-[gray] border"
                      onClick={() => handleRate(item.id)}
                    >
                      <HiOutlineStar className="text-2xl" />
                      <RatingComponent
                        isRate={isRate === item.id}
                        id={item.id}
                        mediaType={activeTab}
                      />
                    </div>
                    <div className="text-base font-medium">Đánh giá!</div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div
                      className="p-2 rounded-full text-white hover:bg-[#212536] cursor-pointer border-[gray] border"
                      onClick={() =>
                        handleFavoriteToggle(item.id, isFavorite, activeTab)
                      }
                    >
                      {isFavorite ? (
                        <HiHeart className="text-red-500 text-2xl" />
                      ) : (
                        <HiOutlineHeart className="text-gray-300 text-2xl" />
                      )}
                    </div>
                    <div className="text-base font-medium">Yêu thích</div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div
                      className="p-2 relative rounded-full text-white hover:bg-[#212536] cursor-pointer border-[gray] border z-0"
                      onClick={() => handleToggle(item.id)}
                    >
                      <MdFormatListBulletedAdd className="text-2xl" />
                      <div
                        ref={dropdownRef}
                        className="dropdown-content absolute top-0 left-[120%] w-[300px]"
                      >
                        <DropdownLists
                          showDropdown={showDropdown === item.id}
                          id={item.id}
                          lists={lists}
                          setLists={setLists}
                          refetch={refetch}
                        />
                      </div>
                    </div>
                    <div className="text-base font-medium">
                      Thêm vào danh sách
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default FavoriteList;
