import React from "react";
import { useGetTrending } from "../../Servives/GlobalApi";
import TrendingItem from "./TrendingItem";
import Slider from "react-slick";
import { Link } from "react-router-dom"; // Import Link để điều hướng

function Trending() {
  const { dataTrending } = useGetTrending();

  const settings = {
    infinite: true, 
    speed: 500, 
    slidesToShow: 5, 
    slidesToScroll: 1, 
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 5 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2 },
      },
    ],
  };

  return (
    <div>
      <h3 className="text-[1.5rem] font-bold my-2">Trending</h3>
      <div>
        {!dataTrending ? (
          <div>Loading...</div>
        ) : (
          <Slider {...settings}>
            {dataTrending.map((item, index) => (
              <Link
                key={index}
                to={`/movie/${item.id}`} // Điều hướng tới trang MovieDetail
                className="block" // Đảm bảo item là một phần tử có thể click được
              >
                <TrendingItem
                  title={item.title}
                  backdrop_path={item.poster_path}
                  vote_average={item.vote_average}
                />
              </Link>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
}

export default Trending;
