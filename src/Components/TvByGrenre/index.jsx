import React from "react";
import { FaStar } from "react-icons/fa";
import { HiOutlinePlayCircle } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useTVByGenre } from "../../Servives/GlobalApi";

function TvByGrenre({ selectedGenre, genreName }) {
  const { tvs } = useTVByGenre(selectedGenre);
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <h3 className="text-2xl font-bold mb-4">{genreName}</h3>

      {/* Hiển thị phim */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {!tvs.length ? (
          <p>Loading...</p>
        ) : (
          tvs.map((tv) => (
            <div
              key={tv.id}
              className="relative bg-gray-800 text-white rounded-md p-2 text-center hover:bg-gray-600 transition-all"
            >
              <div className="relative group overflow-hidden">
                {/* Ảnh phim */}
                <img
                  src={`${import.meta.env.VITE_IMG_URL}${tv.poster_path}`}
                  alt={tv.title}
                  className="w-full h-[300px] object-cover rounded-md mb-2 transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
                {/* Điểm đánh giá */}
                <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-yellow-400 flex items-center gap-1 px-2 py-1 rounded-md shadow-md">
                  <FaStar />
                  <span className="text-sm font-semibold">
                    {tv.vote_average.toFixed(1)}
                  </span>
                </div>
                {/* Nút HiOutlinePlayCircle */}
                <div
                  className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                  onClick={() => navigate(`/tvserie/${tv.id}`)}
                >
                  <HiOutlinePlayCircle className="text-white text-5xl" />
                </div>
              </div>
              <h4 className="font-bold">{tv.name}</h4>
              <p>Lượt xem: {tv.popularity}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TvByGrenre;
