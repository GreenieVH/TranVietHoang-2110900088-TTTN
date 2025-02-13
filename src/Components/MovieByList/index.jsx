import React from "react";
import { useFavoriteMovies, useFetchMoviesByList } from "../../Servives/Auth";
import { useNavigate, useParams } from "react-router-dom";
import {
  HiHeart,
  HiOutlineHeart,
  HiOutlineStar,
  HiPlay,
} from "react-icons/hi2";
import { Rating } from "../Rating";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { TailSpin } from "react-loader-spinner";

function MovieByList() {
  const navigate = useNavigate();
  const sessionId = localStorage.getItem("sessionId");
  const accountId = localStorage.getItem("accountId");
  const { listId } = useParams();
  const { movies, loading } = useFetchMoviesByList(listId);
  const { favorites: editFavorite, handleFavoriteToggle } = useFavoriteMovies(
    sessionId,
    accountId
  );
  const handleItemClick = (item) => {
    if (item.media_type === "movie") {
      navigate(`/movie/${item.id}`); // Điều hướng đến component Movie
    } else {
      navigate(`/tvserie/${item.id}`); // Điều hướng đến component TV Series
    }
  };
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <TailSpin height="80" width="80" color="#4A90E2" />
      </div>
    );
  return (
    <div className="max-w-screen-2xl px-16 mx-auto min-h-screen">
      <div
        style={{
          backgroundImage: movies?.items?.length
            ? `url(${import.meta.env.VITE_IMGL_URL}${
                movies.items[0].backdrop_path
              })`
            : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="w-full h-60"
      >
        <div className="bg-[#0D96CE] bg-opacity-50 relative z-20 h-full flex flex-wrap content-between justify-center">
          <div className="px-16 py-4 w-full md:max-w-[1400px] flex flex-col justify-center p-5 md:px-10">
            <div className="flex flex-col justify-start gap-x-5">
              <p className="text-3xl font-bold">{movies.name}</p>
              <p className="italic">{movies.description}</p>
              <p className="text-2xl">Được tạo bởi {movies.created_by}</p>
            </div>
          </div>
          <div className="w-full flex justify-center bg-black/50 py-2">
            <div className="w-full md:max-w-[1400px] flex px-5 md:px-10 gap-3">
              <a className="font-semibold text-white/50 cursor-pointer">Edit</a>
              <div className="flex items-center text-md text-white/50 font-semibold cursor-pointer">
                Share
              </div>
            </div>
          </div>
        </div>
      </div>
      <ul className="space-y-4 mt-4">
        {movies.items &&
          movies.items.map((item) => (
            <li
              key={item.id}
              className="flex h-[220px] items-center gap-4 border border-gray-400 rounded-xl"
            >
              {/* Image */}
              <div
                className="relative w-32 h-full overflow-hidden cursor-pointer"
                onClick={() => handleItemClick(item)}
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
                    <div className="p-2 rounded-full text-white hover:bg-[#212536] border-[gray] border">
                      <HiOutlineStar className="text-2xl" />
                    </div>
                    <div className="text-base font-medium">Đánh giá!</div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div
                      className="p-2 rounded-full text-white hover:bg-[#212536] border-[gray] border"
                      onClick={() => handleFavoriteToggle(item.id)}
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
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default MovieByList;
