import { FaStar } from "react-icons/fa";
import { HiHeart, HiOutlineHeart, HiOutlinePlayCircle } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useFavoriteMovies, useFollowlist } from "../../Servives/Auth";
import { TailSpin } from "react-loader-spinner";
import { MdFormatListBulletedAdd } from "react-icons/md";

function TvList({ tvs, loading}) {
  const navigate = useNavigate();
  const sessionId = localStorage.getItem("sessionId");
  const accountId = localStorage.getItem("accountId");
  const { toggleFollowlist } = useFollowlist("tv");
  const { favorites, handleFavoriteToggle } = useFavoriteMovies(
    sessionId,
    accountId,
    "tv"
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <TailSpin height="80" width="80" color="#4A90E2" />
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Hiển thị phim */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {!tvs.length ? (
          <p>Không tìm thấy phim phù hợp!</p>
        ) : (
          tvs.map((tv) => (
            <div
              key={tv.id}
              className="relative bg-gray-800 text-white rounded-md p-2 text-center hover:bg-gray-600 transition-all"
            >
              <div className="relative group overflow-hidden">
                {/* Ảnh phim */}
                <img
                  src={`${import.meta.env.VITE_IMG_URL}${tv.poster_path}`}
                  alt={tv.title}
                  className="w-full h-[300px] object-cover rounded-md mb-2 transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
                {/* Điểm đánh giá */}
                <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-yellow-400 flex items-center gap-1 px-2 py-1 rounded-md shadow-md">
                  <FaStar />
                  <span className="text-sm font-semibold">
                    {tv.vote_average.toFixed(1)}
                  </span>
                </div>
                {/* Nút HiOutlinePlayCircle */}
                <div
                  className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                  onClick={() => navigate(`/tvserie/${tv.id}`)}
                >
                  <HiOutlinePlayCircle className="text-white text-5xl" />
                </div>
              </div>
              <h4 className="font-bold">{tv.name}</h4>
              <p className="text-gray-500">
                {tv.first_air_date
                  ? new Date(tv.first_air_date).toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "N/A"}
              </p>
              {/* Icon yêu thích */}
              <div
                className="absolute top-2 right-2 text-white cursor-pointer"
                onClick={() => handleFavoriteToggle(tv.id)}
              >
                {favorites.has(tv.id, "tv") ? (
                  <HiHeart className="text-red-500 text-3xl" />
                ) : (
                  <HiOutlineHeart className="text-red-500 text-3xl" />
                )}
              </div>
              {/* Icon them vao danh sach */}
              <div className="absolute top-10 right-2 text-white cursor-pointer" onClick={()=>toggleFollowlist(tv.id)}>
                <MdFormatListBulletedAdd className="text-3xl" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TvList;

