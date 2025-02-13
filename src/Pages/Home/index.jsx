import React, { useState } from "react";
import Sliders from "../../Components/Slider";
import Trending from "../../Components/Trending";
import Production from "../../Components/Production";
import PopularMovies from "../../Components/PopularMovies";
import { useFavoriteMovies, useFetchMovieLists } from "../../Servives/Auth";
import { useGetPopular, useGetTrending } from "../../Servives/GlobalApi";

function Home() {
  const sessionId = localStorage.getItem("sessionId");
  const accountId = localStorage.getItem("accountId");
  const { lists, loading:LoadingMovieList, setLists } = useFetchMovieLists(sessionId, accountId);
  const { dataTrending, loading: Loadingtrending } = useGetTrending();
  const { favorites, handleFavoriteToggle } = useFavoriteMovies(
    sessionId,
    accountId
  );
  const { dataPopular } = useGetPopular();

  return (
    <div className="px-16 max-w-screen-2xl mx-auto">
      <Sliders />
      <Trending
        dataTrending={dataTrending}
        Loadingtrending={Loadingtrending}
        lists={lists}
        setLists={setLists}
        LoadingMovieList={LoadingMovieList}
      />
      <PopularMovies
        favorites={favorites}
        handleFavoriteToggle={handleFavoriteToggle}
        dataPopular={dataPopular}
        lists={lists}
        setLists={setLists}
      />
      <Production />
    </div>
  );
}

export default Home;
