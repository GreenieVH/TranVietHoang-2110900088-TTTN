import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSearch } from "../../Servives/GlobalApi";

function SearchResults() {
  const [searchTerm, setSearchTerm] = useState("");
  const { searchResults, isSearching, error, search } = useSearch();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search).get("query");
    if (query) {
      setSearchTerm(query);
      search(query); // Fetch results on page load based on query
    }
  }, [location.search, search]);

  return (
    <div>
      <h1>Kết quả tìm kiếm cho "{searchTerm}"</h1>
      {isSearching && <p className="text-white">Đang tìm kiếm...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div>
        {searchResults.length > 0 ? (
          searchResults.map((result) => (
            <div key={result.id}>
              <h2>{result.title || result.name}</h2>
              {/* Other result details */}
            </div>
          ))
        ) : (
          <p>Không có kết quả nào.</p>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
