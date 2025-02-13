import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSearch } from "../../Servives/GlobalApi";
import { HiOutlinePlayCircle } from "react-icons/hi2";

function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const { searchTerm, searchResults, isSearching, error } = useSearch(
    location.search
  );

  // Trạng thái theo dõi loại được chọn
  const [selectedType, setSelectedType] = useState("all"); // Mặc định hiển thị tất cả

  // Tính toán số lượng kết quả theo từng loại
  const resultCounts = searchResults.reduce(
    (acc, result) => {
      acc[result.media_type] = (acc[result.media_type] || 0) + 1;
      return acc;
    },
    { tv: 0, movie: 0, person: 0 }
  );

  const selectResults = [
    { type: "all", label: "Tất cả", count: searchResults.length },
    { type: "tv", label: "TV Shows", count: resultCounts.tv },
    { type: "movie", label: "Movies", count: resultCounts.movie },
    { type: "person", label: "People", count: resultCounts.person },
  ];

  // Lọc kết quả dựa trên loại được chọn
  const filteredResults =
    selectedType === "all"
      ? searchResults
      : searchResults.filter((result) => result.media_type === selectedType);

  const handleItemClick = (result) => {
    // Điều hướng đến chi tiết item
    const targetPath =
      result.media_type === "movie"
        ? `/movie/${result.id}`
        : `/tvserie/${result.id}`;
    navigate(targetPath);
    // setIsSearchResultsVisible(false); 
  };

  return (
    <div className="flex w-full min-h-screen text-white px-16 max-w-screen-2xl gap-8 mx-auto">
      {/* Sidebar: Hiển thị số lượng kết quả theo từng loại */}
      <div className="w-1/5 rounded-lg mt-5 border-[#1F2937] border-[1px] shadow-md text-white">
        <h2 className="text-xl bg-blue-600 rounded-t-lg font-bold mb-1 py-4 text-center">
          Kết quả tìm kiếm
        </h2>
        <ul className="space-y-2 p-4">
          {selectResults.map((item) => (
            <li
              key={item.type}
              className={`cursor-pointer px-4 py-2 rounded-md ${
                selectedType === item.type
                  ? "bg-yellow-500 text-gray-900"
                  : "hover:bg-gray-700"
              }`}
              onClick={() => setSelectedType(item.type)}
            >
              <div className="flex justify-between items-center">
                <p className="font-semibold">{item.label}</p>
                <p className="text-sm font-semibold">{item.count}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Content: Hiển thị danh sách item */}
      <div className="w-4/5 bg-gray-900 p-4 rounded-r-md shadow-md">
        <h1 className="text-xl font-bold mb-4">
          {`Kết quả tìm kiếm cho "${searchTerm}"`}
        </h1>
        {isSearching && <p className="text-gray-400">Đang tìm kiếm...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredResults.length > 0 ? (
            filteredResults.map((result) => (
              <div
                key={result.id}
                className="bg-gray-800 p-4 rounded-md shadow-md"
              >
                <div className="relative group overflow-hidden">
                  <img
                    src={
                      result.poster_path
                        ? `${import.meta.env.VITE_IMG_URL}/${
                            result.poster_path
                          }`
                        : "/placeholder.jpg"
                    }
                    alt={result.title || result.name}
                    className="w-full h-48 object-cover rounded-md transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />
                  {/* Nút Play */}
                  <div
                    className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                    onClick={() => handleItemClick(result)}
                  >
                    <HiOutlinePlayCircle className="text-white text-5xl" />
                  </div>
                </div>
                <div className="mt-2">
                  <h2 className="font-bold text-lg">
                    {result.title || result.name}
                  </h2>
                  <p className="text-sm text-gray-400">
                    Ngày phát hành:{" "}
                    {result.release_date || result.first_air_date || "Không có"}
                  </p>
                  <p className="text-sm text-gray-300 mt-2">
                    {result.overview
                      ? `${result.overview.slice(0, 100)}...`
                      : "Không có mô tả."}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">Không có kết quả nào.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
