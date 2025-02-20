import { useState } from "react";

function FilterTv({ filters, setFilters, closeFilter,tvGenres }) {
  const [tempFilters, setTempFilters] = useState(filters); // Lưu bộ lọc tạm thời
  return (
    <div className="bg-black text-black bg-opacity-50 flex justify-center items-center w-full">
      <div className="bg-white p-6 rounded-md w-full">
        <h2 className="text-xl font-bold mb-4">Bộ lọc</h2>

        {/* Chọn thể loại */}
        <label className="block mb-2">Thể loại:</label>
        <div className="grid grid-cols-2 gap-2">
          {tvGenres.map((g) => (
            <label key={g.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={g.id}
                checked={tempFilters.tvGenres.includes(g.id)}
                onChange={(e) => {
                  setTempFilters((prev) => ({
                    ...prev,
                    tvGenres: e.target.checked
                      ? [...prev.tvGenres, g.id]
                      : prev.tvGenres.filter((id) => id !== g.id),
                  }));
                }}
                className="w-4 h-4"
              />
              <span>{g.name}</span>
            </label>
          ))}
        </div>

        {/* Đánh giá tối thiểu */}
        <label className="block mt-4">Điểm đánh giá tối thiểu:</label>
        <input
          type="number"
          min="0"
          max="10"
          className="border p-2 w-full"
          value={tempFilters.minRating}
          onChange={(e) =>
            setTempFilters({ ...tempFilters, minRating: e.target.value })
          }
        />

        {/* Lượt bình chọn tối thiểu */}
        <label className="block mt-4">Lượt bình chọn tối thiểu:</label>
        <input
          type="number"
          className="border p-2 w-full"
          value={tempFilters.minVotes}
          onChange={(e) =>
            setTempFilters({ ...tempFilters, minVotes: e.target.value })
          }
        />

        {/* Năm phát hành */}
        <label className="block mt-4">Năm phát hành:</label>
        <input
          type="number"
          className="border p-2 w-full"
          value={tempFilters.year}
          onChange={(e) =>
            setTempFilters({ ...tempFilters, year: e.target.value })
          }
        />

        {/* Nút hành động */}
        <div className="flex justify-between mt-4">
          <button
            className="bg-gray-400 px-4 py-2 rounded-md"
            onClick={closeFilter}
          >
            Đóng
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={() => {
              setFilters(tempFilters); // Cập nhật filters khi nhấn "Áp dụng"
              closeFilter();
            }}
          >
            Áp dụng
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterTv;
