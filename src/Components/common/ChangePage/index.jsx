import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";

function ChangePage({page,prevPage,nextPage,totalPages}) {
  return (
    <div className="flex justify-center items-center my-2 gap-3">
      {/* Nút trang trước */}
      <button
        className={`p-2 text-white bg-blue-600 rounded-md ${
          page === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={prevPage}
        disabled={page === 1}
      >
        <HiArrowLeft className="text-2xl" />
      </button>

      <span className="text-lg font-semibold">{`Trang ${page} / ${totalPages}`}</span>

      {/* Nút trang sau */}
      <button
        className={`p-2 text-white bg-blue-600 rounded-md ${
          page === totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={nextPage}
        disabled={page === totalPages}
      >
        <HiArrowRight className="text-2xl" />
      </button>
    </div>
  );
}

export default ChangePage;
