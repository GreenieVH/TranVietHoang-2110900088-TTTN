import React from "react";

function SlideItem({ title, backdrop_path, overview, release_date, vote_average }) {
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
          <p className="text-sm mb-2">Ngày phát hành: {release_date}</p>
          <p className="text-sm mb-4">Đánh giá: ⭐ {vote_average}</p>
          <p className="text-sm leading-relaxed line-clamp-4">{overview}</p>
        </div>
      </div>
    </div>
  );
}

export default SlideItem;
