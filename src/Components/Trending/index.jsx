import React from "react";
import { useGetTrending } from "../../Servives/GlobalApi";
import TrendingItem from "./TrendingItem";
import Slider from "react-slick";
import { Link } from "react-router-dom"; // Import Link để điều hướng
import { motion } from "framer-motion";
import { TailSpin } from "react-loader-spinner";

function Trending() {
  const { dataTrending,loading } = useGetTrending();

  if (loading)
      return (
        <div className="flex justify-center items-center h-screen">
          <TailSpin height="80" width="80" color="#4A90E2" />
        </div>
      );

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
    <div className="relative z-10 ">
      <h3 className="text-2xl font-bold my-2 px-4 py-4">Trending</h3>
      <div>
        {!dataTrending ? (
          <div>Loading...</div>
        ) : (
          <Slider {...settings}>
            {dataTrending.map((item, index) => (
                <TrendingItem
                  title={item.title}
                  backdrop_path={item.poster_path}
                  vote_average={item.vote_average}
                  id={item.id}
                />
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
}

export default Trending;
