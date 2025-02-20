import TrendingItem from "./TrendingItem";
import Slider from "react-slick";
import { TailSpin } from "react-loader-spinner";
import { useDelayedLoadings } from "../../../hooks/DelayedLoading";
import LoadingComponent from "../../common/LoadingComponent";

function Trending({
  dataTrending,
  lists,
  setLists,
  Loadingtrending,
  LoadingMovieList,
  movies,
  handleFavoriteToggle,
  refetch,
}) {
  const showLoading = useDelayedLoadings(
    [Loadingtrending, LoadingMovieList],0
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

  if (showLoading) {
    return <LoadingComponent />;
  }
  return (
    <div className="relative z-10 ">
      <h3 className="text-2xl font-bold my-2 px-4 py-4">Trending</h3>
      <div>
        {!dataTrending ? (
          <div>Loading...</div>
        ) : (
          <Slider {...settings}>
            {dataTrending.map((item, index) => {
              const isFavorite = movies.some(
                (favMovie) => favMovie.id === item.id
              );
              return (
                <TrendingItem
                  key={index}
                  title={item.title}
                  backdrop_path={item.poster_path}
                  vote_average={item.vote_average}
                  id={item.id}
                  lists={lists}
                  setLists={setLists}
                  handleFavoriteToggle={handleFavoriteToggle}
                  isFavorite={isFavorite}
                  refetch={refetch}
                />
              );
            })}
          </Slider>
        )}
      </div>
    </div>
  );
}

export default Trending;
