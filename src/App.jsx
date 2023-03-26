import { Routes, Route } from "react-router-dom"
import { useEffect } from "react"


import HeaderMenu from "./components/HeaderMenu"
import Footer from "./components/Footer"

import StartPage from "./pages/StartPage"
import Movies from "./pages/Movies"
import MovieDetails from "./pages/MovieDetails"
import Contact from "./pages/Contact"
import Receipt from "./pages/Receipt"
import Page404 from "./pages/Page404"

import { useStates } from './utilities/states'
import { kebabify } from './utilities/kebabify'


export default function App() {


  ///////////////////////////////////
  // Fetching data: Screenings and movies AND combining them 
  const s = useStates('screenings', {
    screenings: []
  })

  useEffect(() => {
    // Fetch screenings and movies data
    const fetchScreenings = fetch('/api/screenings').then(res => res.json());
    const fetchMovies = fetch('/api/movies').then(res => res.json());

    // Combine screenings and movies data
    Promise.all([fetchScreenings, fetchMovies]).then(data => {
      const [screeningsData, moviesData] = data;
      const combinedData = screeningsData.map(screening => {
        const movie = moviesData.find(movie => movie.id === screening.movieId)
        return {
          ...screening,
          movieTitle: movie.title,
          movieDuration: movie.description.length,
          moviePoster: movie.description.posterImage,
          categories: movie.description.categories,
          slug: kebabify(movie.title)
        }
      })
      s.screenings = combinedData
    })
  }, [])


  ///////////////////////////////////
  // Fetching movie categories
  const c = useStates('movieCategories', {
    movieCategories: [],
    catFilter: "All Categories"
  })

  useEffect(() => {
    (async () => {
      c.movieCategories = await (await fetch('/api/categories')).json();
    })();
  }, []);



  ///////////////////////////////////
  // Fetching tickets types
  const t = useStates('tickets', {
    tickets: []
  })

  useEffect(() => {
    (async () => {
      t.tickets = await (await fetch('/api/ticketTypes')).json();
    })();
  }, []);






  return <>
    <header>
      <HeaderMenu />
    </header>

    <main>
      <div className="container mt-4 mb-3">
        <Routes>
          <Route path="/" element={< StartPage />} />
          <Route path="/movies" element={< Movies />} />
          <Route path="/movie-details/:slug/:id" element={< MovieDetails />} />
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
