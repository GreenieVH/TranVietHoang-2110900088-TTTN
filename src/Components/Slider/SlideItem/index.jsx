import React from "react";

function SlideItem({ title, backdrop_path }) {
  return (
    <div className="relative p-5 hover:scale-[1.02] transition-all duration-300 ease-in-out ">
      <img
        src={`${import.meta.env.VITE_IMG_URL}${backdrop_path}`}
        alt={title}
        className="w-full h-[300px] object-cover rounded-md shadow-md"
      />
      <div className="absolute top-20 left-10 text-[25px] bg-black rounded-lg bg-opacity-55 font-bold text-white p-2">
        {title.toUpperCase()}
      </div>
    </div>
  );
}

export default SlideItem;
