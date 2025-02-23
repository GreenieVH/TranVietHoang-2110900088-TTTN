import { useMemo, useState } from "react";
import FilterMovies from "../FilterMovies";
import { useGenres, useMoviesFilter } from "../../Servives/GlobalApi";
import MovieList from "../MovieList";
import ChangePage from "../../Components/common/ChangePage";

function MoviesByGenre({ selectedGenre, genreName }) {
  const [filterVisible, setFilterVisible] = useState(false);
  const { genres } = useGenres(); // Lấy danh sách thể loại
  const [filters, setFilters] = useState({
    genres: [],
    minRating: 0,
    minVotes: 0,
    year: "",
  });
  const { movies, loading, page, totalPages, nextPage, prevPage } =
    useMoviesFilter(selectedGenre, filters);

  // Cập nhật tiêu đề dựa trên thể loại đã chọn
  const gName = useMemo(() => {
    if (filters.genres.length === 0) return genreName;
    return genres
      .filter((g) => filters.genres.includes(g.id))
      .map((g) => g.name)
      .join(" + ");
  }, [filters.genres, genres]);
  return (
    <div className="p-4 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">
          Danh sách phim thuộc thể loại: {gName}
        </h3>
        <button
          className="bg-[#032541] w-28 text-white px-4 py-2 rounded-md"
          onClick={() => setFilterVisible(true)}
        >
          Lọc Phim
        </button>
      </div>

      {filterVisible && (
        <FilterMovies
          filters={filters}
          setFilters={setFilters}
          closeFilter={() => setFilterVisible(false)}
        />
      )}
      {/* Nút Load More */}
      {movies.length > 0 && (
        <ChangePage
          page={page}
          totalPages={totalPages}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      )}
      <MovieList movies={movies} loading={loading} />
      {/* Nút Load More */}
      {movies.length > 0 && (
        <ChangePage
          page={page}
          totalPages={totalPages}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      )}
    </div>
  );
}

export default MoviesByGenre;
