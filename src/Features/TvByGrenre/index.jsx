import { useMemo, useState } from "react";
import { useTvFilter, useTvGenres } from "../../Servives/GlobalApi";
import FilterTv from "../FilterTv";
import ChangePage from "../../Components/common/ChangePage";
import TvList from "../TvList";

function TvByGrenre({ selectedGenre, genreName }) {
  const [filterVisible, setFilterVisible] = useState(false);
  const { tvGenres } = useTvGenres(); // Lấy danh sách thể loại
  const [filters, setFilters] = useState({
    tvGenres: [],
    minRating: 0,
    minVotes: 0,
    year: "",
  });
  const { tvs, loading, page, totalPages, nextPage, prevPage } = useTvFilter(
    selectedGenre,
    filters
  );

  // Cập nhật tiêu đề dựa trên thể loại đã chọn
  const gName = useMemo(() => {
    if (filters.tvGenres.length === 0) return genreName;
    return tvGenres
      .filter((g) => filters.tvGenres.includes(g.id))
      .map((g) => g.name)
      .join(" + ");
  }, [filters.tvGenres, tvGenres]);
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
        <FilterTv
          tvGenres={tvGenres}
          filters={filters}
          setFilters={setFilters}
          closeFilter={() => setFilterVisible(false)}
        />
      )}
      {/* Nút Load More */}
      {tvs.length > 0 && (
        <ChangePage
          page={page}
          totalPages={totalPages}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      )}
      <TvList tvs={tvs} loading={loading} />
      {/* Nút Load More */}
      {tvs.length > 0 && (
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

export default TvByGrenre;
