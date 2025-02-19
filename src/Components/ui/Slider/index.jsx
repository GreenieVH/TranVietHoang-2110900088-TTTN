import { useGetPopular } from "../../../Servives/GlobalApi";
import SlideItem from "./SlideItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { TailSpin } from "react-loader-spinner";

function Sliders() {
  const { dataPopular, loading } = useGetPopular();

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <TailSpin height="80" width="80" color="#4A90E2" />
      </div>
    );
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
    <div className="mb-5 relative z-10">
      {!dataPopular ? (
        <div>Loading...</div>
      ) : (
        <Slider {...settings}>
          {dataPopular
            .filter((item) => item.overview)
            .slice(0, 7)
            .map((item, index) => (
              <SlideItem
                id={item.id}
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
