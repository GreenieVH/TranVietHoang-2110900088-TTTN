import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import MainLayout from "./Components/Layouts/MainLayout";
import Movies from "./Pages/Movie";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout><Home/></MainLayout>}/>
          <Route path="/home" element={<MainLayout><Home/></MainLayout>}/>
          <Route path="/movies" element={<MainLayout><Movies/></MainLayout>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
