import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchGmovieDetails } from "../../Servives/GphimApi";
import { HiMiniPlay } from "react-icons/hi2";
import { GoDotFill } from "react-icons/go";
import { Rating } from "../../Components/common/Rating";
import Remark from "../../Components/ui/Remark";
import VideoEmbed from "../../Components/ui/VideoEmbed";
import { FaRegDotCircle } from "react-icons/fa";
import { TailSpin } from "react-loader-spinner";

function GmovieDetail() {
  const { slug } = useParams();
  const { gmovie, loading, error } = useFetchGmovieDetails(slug);
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState("gmovie");
  const navigate = useNavigate();

  const embedUrl = gmovie?.movie?.trailer_url?.replace("watch?v=", "embed/");
  const handleWatchMovie = () => {
    console.log("Gmovie data:", gmovie); // Kiểm tra dữ liệu phim nhận được

    if (
      gmovie?.episodes?.length > 0 &&
      gmovie.episodes[0]?.server_data?.length > 0
    ) {
      const firstEpisodeSlug = gmovie.episodes[0].server_data[0].slug; // Lấy tập đầu tiên
      //   console.log("First episode slug:", firstEpisodeSlug);
      navigate(`/gmovie-play/${slug}/${firstEpisodeSlug}`);
    } else {
      console.log(
        "Không tìm thấy tập phim!",
        gmovie.episodes?.[0]?.server_data
      );
      alert("Không tìm thấy tập phim!");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <TailSpin height="80" width="80" color="#4A90E2" />
      </div>
    );
  }
  if (error) return <p className="h-screen">Lỗi: {error}</p>;
  if (!gmovie) return <p className="h-screen">Không tìm thấy phim.</p>;

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
          url(${gmovie.movie.thumb_url})
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
                src={gmovie.movie.poster_url}
                alt={gmovie.movie.name}
                className="rounded-md shadow-lg"
                style={{ width: "300px", height: "450px" }}
              />
              <div className="absolute w-full bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center gap-4">
                {
                  <button
                    onClick={() => setShow(!show)}
                    className="px-4 py-2 flex items-center gap-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700"
                  >
                    <HiMiniPlay /> {show ? "Đóng Trailer" : "Xem Trailer"}
                  </button>
                }
                <button
                  onClick={handleWatchMovie}
                  className="px-4 py-2 flex items-center gap-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700"
                >
                  <HiMiniPlay />
                  Xem Phim
                </button>
              </div>
            </div>
          </div>

          {/* Thông tin phim */}
          <div className={`flex-1 ${show ? "hidden" : ""}`}>
            <h1 className="text-3xl font-bold mb-2">
              {gmovie.movie.origin_name}: {gmovie.movie.name}
            </h1>
            <p className="text-gray-100 font-medium text-base mb-2">
              {gmovie.movie.created
                ? new Date(gmovie.movie.created.time).toLocaleDateString(
                    "vi-VN",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )
                : "N/A"}{" "}
              -{" "}
              {gmovie.movie.status === "completed"
                ? "Đã hoàn thành"
                : "Đang phát hành"}
            </p>
            <div className="flex items-center mb-2 gap-2">
              <p>
                {gmovie?.movie?.category
                  ? gmovie.movie.category.map((cate) => cate.name).join(", ")
                  : ""}
              </p>
              <GoDotFill />
              <p>
                {gmovie.movie.episode_total
                  ? `Số tập: ${gmovie.movie.episode_total}`
                  : "Không có thông tin"}
              </p>
              <GoDotFill />
              <p>
                {gmovie.movie.episode_total
                  ? `Số mùa: ${gmovie.movie.episode_total}`
                  : "Không có thông tin"}
              </p>
            </div>
            <div className="mb-2 flex items-center gap-3">
              <div className="bg-[#131520] flex size-16 items-center rounded-full ">
                <Rating
                  score={gmovie.movie.tmdb.vote_average}
                  r={40}
                  strokew="0.6rem"
                />
              </div>
              <p>
                (Đánh giá{" "}
                {gmovie?.movie?.tmdb?.vote_average !== undefined
                  ? gmovie.movie.tmdb.vote_average.toFixed(1)
                  : "?"}
                /10 từ{" "}
                {gmovie.movie?.tmdb.vote_count
                  ? gmovie.movie?.tmdb.vote_count
                  : 0}{" "}
                thành viên)
              </p>
            </div>
            <h2 className="text-xl font-semibold mb-2">Mô tả:</h2>
            <p className="leading-relaxed mb-6">
              {gmovie.movie.content || "Không có mô tả"}
            </p>
            <div className="flex justify-around border-t border-[gray] pt-4">
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Đạo diễn:</h2>
                <p>
                  {gmovie.movie.director
                    ? gmovie.movie.director
                    : "Không có thông tin"}
                </p>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Biên kịch:</h2>
                <p>
                  {gmovie?.movie?.actor
                    ? gmovie?.movie?.actor
                        .slice(0, 3)
                        .map((item) => item)
                        .join(", ")
                    : "Không có thông tin"}
                </p>
              </div>
            </div>
          </div>
          {/* video */}
          <div className={`${!show ? "hidden" : "flex-1"} `}>
            {show && (
              <div className="flex flex-col transform transition-all duration-400 ease-in-out animate-show">
                <iframe
                  width="100%"
                  height="450"
                  src={embedUrl}
                  title={`${gmovie?.movie?.name} Trailer`}
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
            onClick={() => setActiveTab("gmovie")}
            className={`px-4 py-2 text-lg font-semibold border-b-2 cursor-pointer ${
              activeTab === "gmovie"
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
          {activeTab === "gmovie" ? (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2 text-lg">
                <div className="flex items-center gap-2">
                  <FaRegDotCircle className="text-green-600" />
                  <span>Tập mới:</span>
                  <div className="bg-[#131520] px-3 rounded-sm cursor-pointer">
                    {gmovie.movie.episode_current}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FaRegDotCircle className="text-green-600" />
                  <span>
                    Lịch chiếu:{" "}
                    {gmovie?.movie?.modified?.time
                      ? `phát sóng tập tiếp theo vào ${new Date(
                          gmovie.movie.modified.time
                        ).toLocaleDateString("vi-VN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}`
                      : "chưa cập nhật"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaRegDotCircle className="text-green-600" />
                  <span>
                    Trạng thái:{" "}
                    {gmovie.movie.status === "completed"
                      ? "Đã phát hành"
                      : "Đang phát hành"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <FaRegDotCircle className="text-green-600" />
                  <span>
                    Thể loại:{" "}
                    {gmovie.movie.category.map((cate) => cate.name).join(", ")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaRegDotCircle className="text-green-600" />
                  <span>
                    Đạo diễn:{" "}
                    {gmovie.movie.director
                      ? gmovie.movie.director
                      : "Không có thông tin"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaRegDotCircle className="text-green-600" />
                  <span>
                    Quốc gia:{" "}
                    {gmovie.movie.country.map((c) => c.name).join(", ")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaRegDotCircle className="text-green-600" />
                  <span>Số lượt đánh giá: {gmovie.movie.tmdb.vote_count}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 text-lg">
                <div className="flex items-center gap-2">
                  <FaRegDotCircle className="text-green-600" />
                  <span>Thời lượng: {gmovie.movie.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaRegDotCircle className="text-green-600" />
                  <span>Chất lượng: {gmovie.movie.quality}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaRegDotCircle className="text-green-600" />
                  <span>Ngôn ngữ: {gmovie.movie.lang || "Không xác định"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaRegDotCircle className="text-green-600" />
                  <span>
                    Chiếu rạp: {gmovie.movie.chieurap ? "Có" : "Không"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaRegDotCircle className="text-green-600" />
                  <span>Năm : {gmovie.movie.year}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-4">
              <h2 className="text-2xl font-bold">Dàn Diễn Viên</h2>
              <div className="scroll-container">
                {/* <div className="flex gap-4 px-4 z-10">
                  {gmovieCredits.cast
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
                  {visibleCount < gmovieCredits.cast.length && (
                    <div className="text-center min-w-[150px] min-h-[175px] flex items-center justify-center mt-4">
                      <button
                        onClick={() =>
                          segmovieisibleCount((prevCount) => prevCount + 5)
                        }
                        className="px-4 py-2 bg-[#0C0F1B] bg-opacity-50 text-white rounded-md shadow-md hover:bg-opacity-100 transition-all"
                      >
                        Xem thêm
                      </button>
                    </div>
                  )}
                </div> */}
              </div>
            </div>
          )}
        </div>
      </div>
      <Remark />
    </div>
  );
}

export default GmovieDetail;
