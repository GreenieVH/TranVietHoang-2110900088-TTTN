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

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout><Home/></MainLayout>}/>
          <Route path="/tvs/:genreId" element={<MainLayout><TvSerie/></MainLayout>}/>
          <Route path="/movies/:genreId" element={<MainLayout><Movies/></MainLayout>}/>
          <Route path="/movie/:id" element={<MainLayout><MovieDetail/></MainLayout>} />
          <Route path="/tvserie/:id" element={<MainLayout><TvDetail/></MainLayout>} />
          <Route path="/favoritelist" element={<MainLayout><FavoriteList/></MainLayout>} />
          <Route path="/search-results" element={<MainLayout><SearchResults/></MainLayout>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
