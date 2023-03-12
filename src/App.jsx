import { Routes, Route } from "react-router-dom"

import MainMenu from "./parts/MainMenu"
import Footer from "./parts/Footer"

import StartPage from "./pages/StartPage"
import Movies from "./pages/Movies"
import Contact from "./pages/Contact"
import Booking from "./pages/Booking"
import Receipt from "./pages/Receipt"
import Page404 from "./pages/Page404"


export default function App() {

  return <>
    <header>
      <MainMenu />
    </header>

    <main>
      <Routes>
        <Route path="/" element={< StartPage />} />
        <Route path="/Movies" element={< Movies />} />
        <Route path="/Contact-Us" element={< Contact />} />
        <Route path="/Booking" element={< Booking />} />
        <Route path="/Your-Receipt" element={< Receipt />} />
        <Route path="*" element={< Page404 />} />
      </Routes>
    </main>

    <footer className="container-fluid text-light bg-primary">
      <Footer />
    </footer>
  </>
}
