import React, { useState } from "react";
import Sliders from "../../Components/ui/Slider";
import Trending from "../../Components/ui/Trending";
import Production from "../../Components/ui/Production";
import PopularMovies from "../../Components/ui/PopularMovies";
import {
  useFavoriteList,
  useFavoriteMovies,
  useFetchMovieLists,
} from "../../Servives/Auth";
import { useGetPopular, useGetTrending } from "../../Servives/GlobalApi";

function Home() {
  const sessionId = localStorage.getItem("sessionId");
  const accountId = localStorage.getItem("accountId");
  const {
    lists,
    loading: LoadingMovieList,
    setLists,
    refetch
  } = useFetchMovieLists(sessionId, accountId);
  const { dataTrending, loading: Loadingtrending } = useGetTrending();
  const { handleFavoriteToggle, favoritesUpdated } = useFavoriteMovies(sessionId, accountId);
  const { movies } = useFavoriteList(accountId, sessionId, 1, favoritesUpdated);

  const { dataPopular } = useGetPopular();

  return (
    <div className="px-16 max-w-screen-2xl mx-auto"> 
      <Sliders />
      <Trending
        dataTrending={dataTrending}
        Loadingtrending={Loadingtrending}
        lists={lists}
        setLists={setLists}
        refetch={refetch}
        LoadingMovieList={LoadingMovieList}
        movies={movies}
        handleFavoriteToggle={handleFavoriteToggle}
      />
      <PopularMovies
        handleFavoriteToggle={handleFavoriteToggle}
        dataPopular={dataPopular}
        lists={lists}
        setLists={setLists}
        movies={movies}
      />
      <Production />
    </div>
  );
}

export default Home;
