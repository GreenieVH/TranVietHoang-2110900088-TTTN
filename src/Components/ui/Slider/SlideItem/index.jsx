import React from "react";
import { TiArrowRightThick } from "react-icons/ti";
import { FaStar, FaStarHalfStroke } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function SlideItem({
  id,
  title,
  backdrop_path,
  overview,
  release_date,
  vote_average,
}) {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(vote_average); // Số sao đầy
    const halfStar = vote_average % 1 >= 0.5; // Có sao rưỡi không?

    // Thêm các sao đầy
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-full-${i}`} className="text-yellow-500" />);
    }

    // Thêm sao rưỡi nếu cần
    if (halfStar) {
      stars.push(<FaStarHalfAlt key="star-half" className="text-yellow-500" />);
    }

    // Bổ sung sao trống (nếu muốn đủ 5 sao)
    const totalStars = stars.length;
    for (let i = totalStars; i < 10; i++) {
      stars.push(<FaStar key={`star-empty-${i}`} className="text-gray-300" />);
    }

    return stars;
  };
  return (
    <div className="relative p-5">
      <div className="h-[350px] relative overflow-hidden rounded-md shadow-md">
        {/* Container để zoom ảnh */}
        <div className="w-full h-full transition-transform duration-300 ease-in-out hover:scale-105">
          <img
            src={`${import.meta.env.VITE_IMGL_URL}${backdrop_path}`}
            alt={title}
            className="w-full h-full object-cover rounded-md"
            loading="lazy"
          />
        </div>
        {/* Overlay hiển thị thông tin */}
        <div className="absolute inset-y-0 left-0 w-1/2 bg-black/60 backdrop-blur-sm p-6 text-white flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-base mb-2 italic text-gray-400">
            {release_date
              ? new Date(release_date).toLocaleDateString("vi-VN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "N/A"}
          </p>
          <div className="text-sm mb-4 flex items-center gap-2">
            <p className="font-medium">Đánh giá:</p> <span className="flex gap-1">{renderStars()}</span>
          </div>
          <p className="text-sm leading-relaxed line-clamp-3 mb-4">
            {overview}
          </p>
          <Link to={`/movie/${id}`} className="flex items-center justify-center gap-2 w-[150px] p-2 text-white hover:text-white font-semibold rounded-full border-[2px] border-[#F87171] hover:bg-red-400 bg-transparent cursor-pointer transition-transform duration-700 ease-in-out">
            Xem ngay
            <TiArrowRightThick size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SlideItem;
