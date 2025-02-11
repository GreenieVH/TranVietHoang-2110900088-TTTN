import React, { useState, useRef, useEffect } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useSearch } from "../../Servives/GlobalApi";
import { useLocation, useNavigate } from "react-router-dom";

function SearchBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const [isSearchResultsVisible, setIsSearchResultsVisible] = useState(false);

  // Sử dụng hook useSearch với location.search
  const { searchTerm, searchResults, isSearching, error } = useSearch(location.search);

  const handleSearchSubmit = () => {
    if (searchTerm.trim()) {
      navigate(`/search-results?query=${encodeURIComponent(searchTerm)}`); // Điều hướng và cập nhật URL
      setIsSearchResultsVisible(true);
    }
  };

  // Ẩn kết quả khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchResultsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleItemClick = (result) => {
    // Điều hướng đến chi tiết item
    const targetPath = result.media_type === "movie" ? `/movie/${result.id}` : `/tvserie/${result.id}`;
    navigate(targetPath);
    setIsSearchResultsVisible(false); // Ẩn danh sách kết quả
  };

  return (
    <div className="relative w-full max-w-[300px]" ref={searchRef}>
      <input
        type="text"
        placeholder="Tìm kiếm..."
        className="bg-gray-800 text-white px-4 py-2 rounded-md w-full md:w-60 focus:outline-none"
        value={searchTerm} // Lấy giá trị từ useSearch
        onChange={(e) => {
          navigate(`?query=${encodeURIComponent(e.target.value)}`); // Cập nhật URL khi nhập
          setIsSearchResultsVisible(true);
        }}
      />
      <button
        onClick={handleSearchSubmit}
        className="absolute right-2 top-1/2 h-10 transform -translate-y-1/2 text-black focus:outline-none"
      >
        <HiMagnifyingGlass size={20} />
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {isSearchResultsVisible && searchResults.length > 0 && (
        <ul
          className="absolute bg-gray-800 text-white w-full mt-2 rounded-md shadow-lg z-50 max-h-[400px] overflow-y-auto"
        >
          {searchResults.map((result) => (
            <li
              key={result.id}
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex"
              onClick={() => handleItemClick(result)}
            >
              <img
                src={`${import.meta.env.VITE_IMGS_URL}/${result.poster_path}`}
                alt={result.title || result.name || "No title"}
                className="w-16 h-24 object-cover rounded-md"
              />
              <div className="ml-4">
                <p>{result.title || result.name}</p>
                <p>
                  Thể loại:{" "}
                  {result.media_type === "tv" ? "TV Serie" : "Movie"}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
