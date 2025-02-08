import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSearch } from "../../Servives/GlobalApi";
import { TailSpin } from "react-loader-spinner";

function SearchResults() {
  const location = useLocation();
  const { searchTerm, searchResults, isSearching, error } = useSearch(location.search);

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
