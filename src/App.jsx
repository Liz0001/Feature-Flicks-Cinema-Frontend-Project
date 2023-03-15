import { Routes, Route } from "react-router-dom"

import MainMenu from "./components/MainMenu"
import Footer from "./components/Footer"

import StartPage from "./pages/StartPage"
import Movies from "./pages/Movies"
import MovieDetails from "./pages/MovieDetails"
import Contact from "./pages/Contact"
import Receipt from "./pages/Receipt"
import Page404 from "./pages/Page404"


export default function App() {

  return <>
    <header>
      <MainMenu />
    </header>

    <main>
      <div className="container mt-4 mb-3">
        <Routes>
          <Route path="/" element={< StartPage />} />
          <Route path="/movies" element={< Movies />} />
          <Route path="/movie-details/:id" element={< MovieDetails />} />
          <Route path="/contact-us" element={< Contact />} />
          <Route path="/your-receipt" element={< Receipt />} />
          <Route path="*" element={< Page404 />} />
        </Routes>
      </div>
    </main>

    <footer className="container-fluid text-light bg-primary bg-gradient">
      <Footer />
    </footer>
  </>
}
