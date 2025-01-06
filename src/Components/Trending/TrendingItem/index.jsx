import React from "react";

function TrendingItem({ title, backdrop_path }) {
  return (
    <div className="relative group overflow-hidden rounded-md">
      <img
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        src={`${import.meta.env.VITE_IMG_URL}${backdrop_path}`}
        alt={title}
      />
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-transparent to-transparent p-4 opacity-0 translate-y-full group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
        <h3 className="text-white text-center text-lg font-bold">{title}</h3>
      </div>
    </div>
  );
}

export default TrendingItem;
