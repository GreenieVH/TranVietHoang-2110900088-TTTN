import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import MainLayout from "./Components/Layouts/MainLayout";
import Movies from "./Pages/Movie";
import Category from "./Pages/Category";
import MovieDetail from "./Components/MovieDetail";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout><Home/></MainLayout>}/>
          <Route path="/category" element={<MainLayout><Category/></MainLayout>}/>
          <Route path="/movies" element={<MainLayout><Movies/></MainLayout>}/>
          <Route path="/movie/:id" element={<MainLayout><MovieDetail/></MainLayout>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
