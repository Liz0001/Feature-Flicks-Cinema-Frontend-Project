
import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'



export default function Movies() {

  const [screenings, setScreenings] = useState([])
  const [movies, setMovies] = useState([])
  const [movieCategories, setMovieCategories] = useState([])
  let catFilter = "All Categories"

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
          categories: movie.description.categories
        }
      })
      setScreenings(combinedData)
      setMovies(moviesData)
    })
  }, [])


  useEffect(() => {
    (async () => {
      setMovieCategories(await (await (fetch("/api/categories"))).json())
    })();
  }, []);




  const handleCategoryChange = (event) => {
    // setMovieCategories(event.target.value)
    catFilter = event.target.value
    console.log(event.target.value)
    // setCategory(category === "All Categories" ? category : category.toLowerCase());
  };


  //////////////////////////////
  // Categories

  function getAllCategories() {
    let allCat = movieCategories.map(cat => cat.title)
    allCat.sort()
    allCat.unshift("All Categories");
    return allCat
  }

  //////////////////////////////
  // getting card info

  function getDuration(time) {
    let hours = (time / 60);
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    return rhours + "h " + rminutes + "m."
  }

  function getMovDay(time) {
    return new Date(time).toLocaleString('default', { weekday: 'long' })
  }

  function getMovDate(time) {
    return new Date(time).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  function getMovHours(time) {
    return new Date(time).getHours()
  }

  function getMovMins(time) {
    return new Date(time).getMinutes().toString().padStart(2, '0')
  }


  // console.log(screenings.filter(({ categories }) => (
  //   catFilter === "All Categories" || categories.includes(catFilter)
  // )))


  //////////////////////////////
  // movies and category filter

  return <>
    <h2 className="p2 mb-3">Movies In Cinema Now</h2>

    {/* Filter Component    - Not working */}
    <Container className="mb-4">
      <Row >
        <Col sm={4}>
          <Form.Select aria-label="Default select example" onChange={handleCategoryChange} >
            {getAllCategories().map(cat =>
              <option key={cat}>{cat}</option>
            )}
          </Form.Select>
        </Col>
        <Col m={8}></Col>
      </Row>
    </Container>


    {/* Card component */}
    {screenings.filter(({ categories }) => (
      catFilter === "All Categories" || categories.includes(catFilter)
    ))
      .map(({ id, movieId, time, movieTitle, movieDuration, categories, moviePoster }) =>
        <NavLink key={id} to={'/movie-details/' + id + "-" + movieId}>
          <Container>
            <Card className="movCard mb-3">
              <Row >

                <Col className="cardImageCol" sm={4}>
                  <Card.Img className="img-card" variant="top" src={"https://cinema-rest.nodehill.se/" + moviePoster} />
                </Col>

                <Col sm={8}>
                  <Card.Body className="body-card">

                    <Card.Text>
                      {getMovDay(time)}, {getMovDate(time)} at {getMovHours(time)}:{getMovMins(time)}
                    </Card.Text>

                    <Card.Text>{categories.join(" / ")}</Card.Text>

                    <Card.Title>{movieTitle}</Card.Title>

                    <Card.Text>Duration: {getDuration(movieDuration)}</Card.Text>

                    <Card.Text>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut labore nam necessitatibus doloribus culpa voluptas deserunt tempore laborum facere quam!</Card.Text>

                    <Button variant="outline-primary">Book tickets now</Button>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Container>
        </NavLink>
      )}
  </>
}
