import React from "react";
import { useGetPopular } from "../../Servives/GlobalApi";
import SlideItem from "./SlideItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function Sliders() {
  const { dataPopular } = useGetPopular();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
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
          />
        ))}
      </Slider>
    )}
  </div>
  );
}

export default Sliders;
