import React from "react";
import { useGetPopular, useGetTrending } from "../../Servives/GlobalApi";
import SlideItem from "./SlideItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function Sliders() {
  const { dataPopular } = useGetPopular();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="mb-5">
    {!dataPopular ? (
      <div>Loading...</div>
    ) : (
      <Slider {...settings}>
        {dataPopular.slice(0, 7).map((item, index) => (
          <SlideItem
            key={index}
            title={item.title}
            backdrop_path={item.backdrop_path}
            overview={item.overview}
            release_date={item.release_date}
            vote_average={item.vote_average}
          />
        ))}
      </Slider>
    )}
  </div>
  );
}

export default Sliders;
