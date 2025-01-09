import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

function TrendingItem({ title, backdrop_path, vote_average, id }) {
  return (
    <div className="relative mx-3 group overflow-hidden rounded-md">
      {/* Hình ảnh */}
      <div className="relative">
        <img
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          src={`${import.meta.env.VITE_IMG_URL}${backdrop_path}`}
          alt={title}
        />
        {/* Điểm đánh giá */}
        <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-yellow-400 flex items-center gap-1 px-2 py-1 rounded-md shadow-md">
          <FaStar />
          <span className="text-sm font-semibold">
            {vote_average.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Hiệu ứng hover */}
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-transparent to-transparent p-4 opacity-0 translate-y-full group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
        <Link
          to={`/movie/${id}`}
          className="mt-4 w-full py-2 text-center bg-yellow-500 text-black hover:text-black font-bold rounded-md transform translate-y-[30px] group-hover:translate-y-0 transition-transform duration-500 block"
        >
          Xem phim
        </Link>
        
        {/* <h3 className="text-white text-center text-lg font-bold absolute top-0 left-0 right-0 transform translate-y-[-100%] group-hover:translate-y-0 transition-transform duration-500">
          {title}
        </h3> */}
      </div>
    </div>
  );
}

export default TrendingItem;
