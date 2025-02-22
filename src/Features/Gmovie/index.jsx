import ChangePage from "../../Components/common/changePage";
import { HiOutlinePlayCircle } from "react-icons/hi2";
import { useFetchGmovie } from "../../Servives/GphimApi";
import { useNavigate } from "react-router-dom";

function Gmovie() {
  const navigate = useNavigate();
  const { gmovie, loading, error, page, totalPages, nextPage, prevPage } =
    useFetchGmovie();

  return (
    <div className="px-16 min-h-screen max-w-screen-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">Danh sách phim</h3>
      </div>

      {/* Nút Load More */}
      {gmovie.length > 0 && (
        <ChangePage
          page={page}
          totalPages={totalPages}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      )}

      <div className="p-4">
        {/* Hiển thị phim */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {!gmovie.length ? (
            <p>Không tìm thấy phim phù hợp!</p>
          ) : (
            gmovie.map((gmovie) => {
              return (
                <div
                  key={gmovie._id}
                  className="relative bg-gray-800 text-white rounded-md p-2 text-center hover:bg-gray-600 transition-all"
                >
                  <div className="relative group overflow-hidden">
                    {/* Ảnh phim */}
                    <img
                      src={gmovie.poster_url}
                      alt={gmovie.name}
                      className="w-full h-[300px] object-cover rounded-md mb-2 transition-transform duration-300 ease-in-out group-hover:scale-105"
                    />
                    {/* Điểm đánh giá */}
                    {/* <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-yellow-400 flex items-center gap-1 px-2 py-1 rounded-md shadow-md">
                      <FaStar />
                      <span className="text-sm font-semibold">
                        {gmovie.vote_average.toFixed(1)}
                      </span>
                    </div> */}
                    {/* Nút HiOutlinePlayCircle */}
                    <div
                      className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                      onClick={() => navigate(`/gmovie-detail/${gmovie.slug}`)}
                    >
                      <HiOutlinePlayCircle className="text-white text-5xl" />
                    </div>
                  </div>
                  <h4 className="font-bold">{gmovie.name}</h4>
                  <p className="text-gray-500">
                    {gmovie.modified.time
                      ? new Date(gmovie.modified.time).toLocaleDateString(
                          "vi-VN",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )
                      : "N/A"}
                  </p>

                  {/* Icon yêu thích */}
                  {/* <div
                    className="absolute top-2 right-2 text-white cursor-pointer"
                    onClick={() => handleFavoriteToggle(gmovie.id,isFavorite)}
                  >
                    {isFavorite ? (
                      <HiHeart className="text-red-500 text-3xl" />
                    ) : (
                      <HiOutlineHeart className="text-white text-3xl" />
                    )}
                  </div> */}

                  {/* Icon them vao danh sach */}
                  {/* <div
                    className="absolute top-10 right-2 text-white cursor-pointer"
                    onClick={() => toggleFollowlist(gmovie.id)}
                  >
                    <MdFormatListBulletedAdd className="text-3xl" />
                  </div> */}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Nút Load More */}
      {gmovie.length > 0 && (
        <ChangePage
          page={page}
          totalPages={totalPages}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      )}
    </div>
  );
}

export default Gmovie;
