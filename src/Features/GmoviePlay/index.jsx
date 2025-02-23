import React, { useMemo, useRef } from "react";
import VideoEmbed from "../../Components/ui/VideoEmbed";
import { useFetchGmovieDetails } from "../../Servives/GphimApi";
import { useNavigate, useParams } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { GoDotFill } from "react-icons/go";
import { Rating } from "../../Components/common/Rating";
import { GrChapterNext } from "react-icons/gr";
import { FaRegComments, FaDownload } from "react-icons/fa6";
import { MdBookmarkAdd, MdReport } from "react-icons/md";
import Remark from "../../Components/ui/Remark";

function GmoviePlay() {
  const { slug, epslug } = useParams();
  const navigate = useNavigate();
  const { gmovie, loading, error } = useFetchGmovieDetails(slug);
  const videoRef = useRef(null);
  // Lấy URL của tập hiện tại
  const currentEpisodeUrl = useMemo(() => {
    for (const server of gmovie?.episodes || []) {
      const episode = server.server_data.find((ep) => ep.slug === epslug);
      if (episode) return episode.link_embed;
    }
    return "";
  }, [gmovie, epslug]);

  const handleSelectEpisode = (episodeSlug) => {
    navigate(`/gmovie-play/${slug}/${episodeSlug}`);
    setTimeout(() => {
      videoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  if (loading) return <Loader />;
  if (error) return <p className="h-screen">Lỗi: {error}</p>;
  if (!gmovie) return <p className="h-screen">Không tìm thấy phim.</p>;
  return (
    <div className="relative min-h-screen text-white max-w-screen-2xl px-16 mx-auto mt-8">
      <div ref={videoRef}>
        <VideoEmbed embedUrl={currentEpisodeUrl} />
      </div>
      <ActionButtons />
      <ServerSelection gmovie={gmovie} />
      <EpisodeSelection gmovie={gmovie} onSelectEpisode={handleSelectEpisode} />
      <MovieDetails gmovie={gmovie} />
      <Remark />
    </div>
  );
}

const Loader = () => (
  <div className="flex justify-center items-center h-screen">
    <TailSpin height="80" width="80" color="#4A90E2" />
  </div>
);

const ActionButtons = () => (
  <div className="flex gap-4 justify-center items-center my-4">
    {[
      { icon: GrChapterNext, text: "Tập tiếp" },
      { icon: FaRegComments, text: "Bình luận" },
      { icon: MdBookmarkAdd, text: "Theo dõi" },
      { icon: MdReport, text: "Báo lỗi" },
      { icon: FaDownload, text: "Tải về" },
    ].map(({ icon: Icon, text }, idx) => (
      <div
        key={idx}
        className="hover:bg-slate-500 p-2 px-4 cursor-pointer flex items-center gap-3"
      >
        <Icon className="text-xl" />
        <p className="text-lg text-white font-semibold">{text}</p>
      </div>
    ))}
  </div>
);

const ServerSelection = ({ gmovie }) => (
  <div className="flex flex-col items-center justify-center">
    <p>Chọn Server:</p>
    <div>
      {gmovie?.episodes?.map((server, idx) => (
        <button key={idx} className="m-2 p-2 border rounded bg-[#213547]">
          {server.server_name}
        </button>
      ))}
    </div>
  </div>
);

const EpisodeSelection = ({ gmovie, onSelectEpisode }) => (
  <div>
    <p>Chọn Tập:</p>
    {gmovie?.episodes?.map((server, idx) => (
      <div key={idx} className="mb-4">
        <p className="font-bold">{server.server_name}</p>
        <div className="flex flex-wrap gap-2">
          {server.server_data.map((episode) => (
            <button
              key={episode.slug}
              className="p-2 border rounded bg-[#213547]"
              onClick={() => onSelectEpisode(episode.slug)}
            >
              {episode.name}
            </button>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const MovieDetails = ({ gmovie }) => (
  <div
    className="h-full p-8 mx-auto max-w-screen-2xl px-16 bg-cover bg-center"
    style={{
      backgroundImage: `linear-gradient(to right, rgba(31.5,31.5,31.5,1) calc((50vw - 170px) - 340px), rgba(31.5,31.5,31.5,0.84) 50%, rgba(31.5,31.5,31.5,0.84) 100%), url(${gmovie.movie.thumb_url})`,
    }}
  >
    <div className="container mx-auto flex flex-col lg:flex-row gap-10">
      <div className="w-full lg:w-[300px] flex justify-center lg:justify-start">
        <img
          src={gmovie.movie.poster_url}
          alt={gmovie.movie.name}
          className="rounded-md shadow-lg w-[300px] h-[450px]"
        />
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-2">
          {gmovie.movie.origin_name}: {gmovie.movie.name}
        </h1>
        <p className="text-gray-100 font-medium text-base mb-2">
          {gmovie.movie.created
            ? new Date(gmovie.movie.created.time).toLocaleDateString("vi-VN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "N/A"}{" "}
          -
          {gmovie.movie.status === "completed"
            ? "Đã hoàn thành"
            : "Đang phát hành"}
        </p>
        <MovieMeta gmovie={gmovie} />
      </div>
    </div>
  </div>
);

const MovieMeta = ({ gmovie }) => (
  <div>
    <div className="flex items-center mb-2 gap-2">
      <p>{gmovie?.movie?.category?.map((cate) => cate.name).join(", ")}</p>
      <GoDotFill />
      <p>Số tập: {gmovie.movie.episode_total || "Không có thông tin"}</p>
    </div>
    <div className="flex items-center gap-3">
      <div className="bg-[#131520] flex size-16 items-center rounded-full">
        <Rating
          score={gmovie.movie.tmdb.vote_average}
          r={40}
          strokew="0.6rem"
        />
      </div>
      <p>
        (Đánh giá {gmovie.movie.tmdb.vote_average?.toFixed(1) || "?"}/10 từ{" "}
        {gmovie.movie?.tmdb.vote_count || 0} thành viên)
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
          {gmovie.movie.director ? gmovie.movie.director : "Không có thông tin"}
        </p>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Biên kịch:</h2>
        <p>
          {gmovie?.movie?.actor
            ? gmovie?.movie?.actor.slice(0, 3).join(", ")
            : "Không có thông tin"}
        </p>
      </div>
    </div>
  </div>
);

export default GmoviePlay;
