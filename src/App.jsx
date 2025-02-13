import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import MainLayout from "./Components/Layouts/MainLayout";
import Movies from "./Pages/Movie";
import MovieDetail from "./Components/MovieDetail";
import Login from "./Pages/Login";
import TvSerie from "./Pages/TvSerie";
import TvDetail from "./Components/TvDetail";
import FavoriteList from "./Pages/FavoriteList";
import SearchResults from "./Components/SearchResults";
import ScrollToTop from "./Components/ScrollToTop";
import WatchList from "./Components/WatchList";
import AuthContext from "./Servives/Context";
import MovieByList from "./Components/MovieByList";

function App() {
  return (
    <>
      <BrowserRouter>
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
            </Route>
              <Route path="/login" element={<Login />} />
          </Routes>
        </AuthContext>
      </BrowserRouter>
    </>
  );
}

export default App;
