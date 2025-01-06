import React from "react";

function SlideItem({ title, backdrop_path, overview }) {
  return (
    <div className="relative p-5 hover:scale-[1.02] transition-all duration-300 ease-in-out">
      <div className="h-[350px] relative">
        <img
          src={`${import.meta.env.VITE_IMG_URL}${backdrop_path}`}
          alt={title}
          className="min-w-full h-full object-cover rounded-md shadow-md"
          loading="lazy"
        />
      </div>
      <div className="absolute top-1/2 left-10 transform -translate-y-1/2 bg-gradient-to-r from-black via-gray-800 to-transparent rounded-lg bg-opacity-70 p-4">
        <span className="text-white font-bold text-[20px] md:text-[25px] lg:text-[30px] tracking-wide drop-shadow-lg">
          {title.toUpperCase()}
        </span>
        <p className="w-1/2 multiline-truncated">{overview}</p>
      </div>
    </div>
  );
}

export default SlideItem;
