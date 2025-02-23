import { HiOutlinePlayCircle } from "react-icons/hi2";
import { useFetchCategory, useMovieByCategory } from "../../Servives/GphimApi";
import { useNavigate, useParams } from "react-router-dom";
import ChangePage from "../../Components/common/ChangePage";
import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { FaArrowDownShortWide } from "react-icons/fa6";

function Gmovie() {
  const { the_loai } = useParams();
  const navigate = useNavigate();
  const { cate } = useFetchCategory();
  const {
    movies,
    loading,
    error,
    setParams,
    nextPage,
    prevPage,
    params,
    totalPages,
  } = useMovieByCategory();
  const [category, setCategory] = useState("hanh-dong");

  useEffect(() => {
    setParams((prev) => ({ ...prev, type_list: the_loai, page: 1 }));
  }, [the_loai]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setParams((prev) => ({ ...prev, type_list: e.target.value, page: 1 }));
  };

  return (
    <div className="px-16 min-h-screen max-w-screen-2xl mx-auto">
      <div className="p-4 min-h-screen">
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-2">
            {movies?.seoOnPage?.titleHead}
          </h2>
          <p className="italic text-gray-500">
            {movies?.seoOnPage?.descriptionHead}
          </p>
        </div>

        <div className="flex justify-between items-center">
          {/* Chọn thể loại */}
          <div className="relative min-w-[150px]">
            <select
              value={category}
              onChange={handleCategoryChange}
              className="border w-full cursor-pointer px-4 py-2 text-base font-semibold rounded-lg bg-[#001931] border-[#00092A] focus:outline-none appearance-none"
            >
              {cate?.map((item) => (
                <option value={item?.slug}>{item?.name}</option>
              ))}
            </select>
            <FaArrowDownShortWide className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Bộ lọc nâng cao */}
          <div className="flex gap-2">
            <div className="relative min-w-[190px]">
              <select
                onChange={(e) =>
                  setParams((prev) => ({ ...prev, sort_field: e.target.value }))
                }
                className="border w-full cursor-pointer p-2 rounded-lg text-base font-semibold  bg-[#001931] border-[#00092A] focus:outline-none appearance-none"
              >
                <option value="modified.time">Thời gian cập nhật</option>
                <option value="year">Năm phát hành</option>
                <option value="_id">ID</option>
              </select>
            <FaArrowDownShortWide className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
            <div className="relative min-w-[120px]">
              <select
                onChange={(e) =>
                  setParams((prev) => ({ ...prev, sort_lang: e.target.value }))
                }
                className="border w-full cursor-pointer p-2 rounded-lg text-base font-semibold  bg-[#001931] border-[#00092A] focus:outline-none appearance-none"
              >
                <option value="vietsub" className="font-semibold">
                  Vietsub
                </option>
                <option value="thuyet-minh">Thuyết Minh</option>
                <option value="long-tieng">Lồng Tiếng</option>
              </select>
            <FaArrowDownShortWide className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />

            </div>
            <div className="relative min-w-[120px]">
              <select
                onChange={(e) =>
                  setParams((prev) => ({ ...prev, sort_type: e.target.value }))
                }
                className="border w-full cursor-pointer p-2 rounded-lg text-base font-semibold bg-[#001931] border-[#00092A] focus:outline-none appearance-none"
              >
                <option value="desc">Giảm dần</option>
                <option value="asc">Tăng dần</option>
              </select>
            <FaArrowDownShortWide className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />

            </div>
          </div>
        </div>

        {/* Nút Load More */}
        {movies?.items?.length > 0 && (
          <ChangePage
            page={params.page}
            totalPages={totalPages}
            prevPage={prevPage}
            nextPage={nextPage}
          />
        )}
        {loading && (
          <div className="flex justify-center items-center h-screen">
            <TailSpin height="80" width="80" color="#4A90E2" />
          </div>
        )}
        {/* Hiển thị phim */}
        <div className="my-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {!movies?.items?.length ? (
            <p>Không tìm thấy phim phù hợp!</p>
          ) : (
            movies?.items?.map((gmovie) => {
              return (
                <div
                  key={gmovie._id}
                  className="relative bg-gray-800 text-white rounded-md p-2 text-center hover:bg-gray-600 transition-all"
                >
                  <div className="relative group overflow-hidden">
                    {/* Ảnh phim */}
                    <img
                      src={`https://phimimg.com/${gmovie.poster_url}`}
                      alt={gmovie.name}
                      className="w-full h-[350px] rounded-md mb-2 transition-transform duration-300 ease-in-out group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                      onClick={() => navigate(`/gmovie-detail/${gmovie.slug}`)}
                    >
                      <HiOutlinePlayCircle className="text-white text-5xl" />
                    </div>
                    <div
                      className="absolute px-2 py-1 rounded-lg
                     top-2 left-2 italic font-semibold bg-[#17649C]"
                    >
                      {gmovie.episode_current}
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
                </div>
              );
            })
          )}
        </div>
        {/* Nút Load More */}
        {movies?.items?.length > 0 && (
          <ChangePage
            page={params.page}
            totalPages={totalPages}
            prevPage={prevPage}
            nextPage={nextPage}
          />
        )}
      </div>
    </div>
  );
}

export default Gmovie;
