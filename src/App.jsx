import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthContext from "./Servives/Context";
import MainLayout from "./Components/Layouts/MainLayout";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Movies from "./Pages/Movie";
import TvSerie from "./Pages/TvSerie";
import FavoriteList from "./Pages/FavoriteList";
import SearchResults from "./Pages/SearchResults";
import WatchList from "./Pages/WatchList";
import MovieDetail from "./Features/MovieDetail";
import TvDetail from "./Features/TvDetail";
import MovieByList from "./Features/MovieByList";
import FollowList from "./Features/FollowList";
import ScrollToTop from "./Components/common/ScrollToTop";
import Gmovie from "./Features/Gmovie";
import GmovieDetail from "./Features/GmovieDetail";
import GmoviePlay from "./Features/GmoviePlay";
import PageTitle from "./Components/common/PageTitle";

function App() {
  return (
    <>
      <BrowserRouter>
        <PageTitle />
        <ScrollToTop />
        <AuthContext>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="/tvs/:genreId" element={<TvSerie />} />
              <Route path="/movies/:genreId" element={<Movies />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
              <Route path="/tvserie/:id" element={<TvDetail />} />
              <Route path="/favoritelist" element={<FavoriteList />} />
              <Route path="/search-results" element={<SearchResults />} />
              <Route path="/watch-list" element={<WatchList />} />
              <Route path="/movie-by-list/:listId" element={<MovieByList />} />
              <Route path="/follow-list" element={<FollowList />} />
              <Route path="/gmovie/:the_loai" element={<Gmovie />} />
              <Route path="/gmovie-detail/:slug" element={<GmovieDetail />} />
              <Route
                path="/gmovie-play/:slug/:epslug"
                element={<GmoviePlay />}
              />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </AuthContext>
      </BrowserRouter>
    </>
  );
}

export default App;
