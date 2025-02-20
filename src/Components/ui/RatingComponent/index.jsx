import { useState } from "react";
import { HiOutlineStar, HiStar } from "react-icons/hi"; // Import icon
import { useRateMedia } from "../../../Servives/Auth";

function RatingComponent({ id, mediaType, isRate,detail }) {
  const sessionId = localStorage.getItem("sessionId")
  const { rateMedia, loading, error } = useRateMedia(sessionId);
  const [hoverRating, setHoverRating] = useState(0); // Điểm khi rê chuột
  const [selectedRating, setSelectedRating] = useState(null); // Điểm đã chọn

  const handleRate = (ratingValue) => {
    setSelectedRating(ratingValue);
    rateMedia(id, mediaType, ratingValue);
  };

  return (
    <>
      {isRate && (
        <div className={`${detail ? "" : "absolute top-[50%] -translate-y-[50%] left-[120%] px-5 py-2 bg-[#1F2937] z-30  rounded-lg border-[1px] border-[#308875]"} flex flex-col items-center`}>
          <div className="flex gap-1">
            {[...Array(10)].map((_, index) => {
              const ratingValue = index + 1;
              return (
                <span
                  key={index}
                  className="cursor-pointer text-yellow-400"
                  onClick={() => handleRate(ratingValue)}
                  onMouseEnter={() => setHoverRating(ratingValue)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  {hoverRating >= ratingValue || selectedRating >= ratingValue ? (
                    <HiStar size={24} />
                  ) : (
                    <HiOutlineStar size={24} />
                  )}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default RatingComponent;
