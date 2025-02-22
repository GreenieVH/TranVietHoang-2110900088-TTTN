import React, { useMemo } from "react";
import VideoEmbed from "../../Components/ui/VideoEmbed";
import { useFetchGmovieDetails } from "../../Servives/GphimApi";
import { useNavigate, useParams } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { GoDotFill } from "react-icons/go";
import { Rating } from "../../Components/common/Rating";
import { GrChapterNext } from "react-icons/gr";
import { FaRegComments, FaDownload } from "react-icons/fa6";
import { MdBookmarkAdd, MdReport } from "react-icons/md";

function GmoviePlay() {
  const { slug, epslug } = useParams();
  const { gmovie, loading, error } = useFetchGmovieDetails(slug);
  const navigate = useNavigate()


  // Lấy URL của tập hiện tại
  const currentEpisodeUrl = useMemo(() => {
    for (const server of gmovie?.episodes || []) {
      const episode = server.server_data.find((ep) => ep.slug === epslug);
      if (episode) return episode.link_embed;
    }
    return "";
  }, [gmovie, epslug]);

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
    <div className="relative min-h-screen text-white max-w-screen-2xl px-16 mx-auto mt-8">
      <VideoEmbed embedUrl={currentEpisodeUrl} />
      <div className="flex gap-4 justify-center items-center my-4">
        <div className="hover:bg-slate-500 p-2 px-4 cursor-pointer flex items-center gap-3">
          <GrChapterNext className="text-xl" />
          <p className="text-lg text-white font-semibold">Tập tiếp</p>
        </div>
        <div className="hover:bg-slate-500 p-2 px-4 cursor-pointer flex items-center gap-3">
          <FaRegComments className="text-xl" />
          <p className="text-lg text-white font-semibold">Bình luận</p>
        </div>
        <div className="hover:bg-slate-500 p-2 px-4 cursor-pointer flex items-center gap-3">
          <MdBookmarkAdd className="text-xl" />
          <p className="text-lg text-white font-semibold">Theo dõi</p>
        </div>
        <div className="hover:bg-slate-500 p-2 px-4 cursor-pointer flex items-center gap-3">
          <MdReport className="text-xl" />
          <p className="text-lg text-white font-semibold">Báo lỗi</p>
        </div>
        <div className="hover:bg-slate-500 p-2 px-4 cursor-pointer flex items-center gap-3">
          <FaDownload className="text-xl" />
          <p className="text-lg text-white font-semibold">Tải về</p>
        </div>
      </div>
      <div>
        <div className="flex flex-col items-center justify-center">
          <p>Chọn Server:</p>
          <div>
            {gmovie?.episodes?.map((server, index) => (
              <button key={index} className="m-2 p-2 border rounded bg-[#213547]">
                {server.server_name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p>Chọn Tập:</p>
          {gmovie?.episodes?.map((server, index) => (
            <div key={index} className="mb-4">
              <p className="font-bold">{server.server_name}</p>
              <div className="flex gap-2">
                {server.server_data.map((episode, epIndex) => (
                  <button
                    key={epIndex}
                    className="p-2 border rounded bg-[#213547]"
                    onClick={() => navigate(`/gmovie-play/${slug}/${episode.slug}`)}
                  >
                    {episode.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

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
            </div>
          </div>

          {/* Thông tin phim */}
          <div className={`flex-1 ${false ? "hidden" : ""}`}>
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
                ? "Đã hoan thanh"
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
            <p className="text-gray-300 text-lg italic mb-2">null</p>
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
                  {gmovie.movie.actor
                    ? gmovie.movie.actor
                    : "Không có thông tin"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GmoviePlay;
