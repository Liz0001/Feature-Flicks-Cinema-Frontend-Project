
import { NavLink } from "react-router-dom"
import { useState, useEffect } from "react";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';


export default function CombineData() {

  // const [category, setCategory] = useState([])
  const [movies, setMovies] = useState([]);
  const [screenings, setScreenings] = useState([])
  const [moviesCategories, setMoviesCategories] = useState([])

  useEffect(() => {
    (async () => {
      setMovies(await (await (fetch("/api/movies"))).json())
      setScreenings(await (await (fetch("/api/screenings"))).json())
      // setMoviesCategories(await (await (fetch("/api/moviesXcategories"))).json())
    })();
  }, []);



  function combineScreeningsAndMovies() {
    let moviesAndScreenings = []

    screenings.forEach(({ id, time, movieId, auditoriumId }) => {
      moviesAndScreenings.push({
        "screeningId": id,
        "screeningDay": getMovDay(time),
        "screeningDate": getMovDate(time),
        "screeningHrs": getMovHours(time),
        "screeningMins": getMovMins(time),
        "auditoriumId": auditoriumId,
        "movieId": movieId,
        "movieTitle": getTitle(movieId),
        "duration": getDuration(movieId),
        "poster": getImage(movieId),
        "categories": getCategorie(movieId)
      })
    })

    return moviesAndScreenings
  }


  // useEffect(() => {
  //   setMovieData(combineScreeningsAndMovies());
  // }, []);


  // console.log(movieData)



  // const displayMovies = screenings.filter((item) => {
  //   const movieCategory = getCategorie(item.movieId).toLowerCase();
  //   return category === "All Categories" || movieCategory.includes(category);
  // });
  // // console.log(m)
  // const handleCategoryChange = (event) => {
  //   const category = event.target.value;
  //   setCategory(category === "All Categories" ? category : category.toLowerCase());

  //   console.log(event.target.value)

  // };
  //////////////////////////////
  // setting card info
  function getDuration(movieId) {
    let time = movies.filter(movie => movie.id === movieId).map(mov => mov.description.length)
    let hours = (time / 60);
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    return rhours + "h " + rminutes + "m."
  }

  function getImage(movieId) {
    return "https://cinema-rest.nodehill.se/" + movies.filter(movie => movie.id === movieId).map(mov => mov.description.posterImage)
  }

  function getTitle(movieId) {
    return movies.filter(movie => movie.id === movieId).map(mov => mov.title)[0]
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

  function getCategorie(movieId) {
    let categories = movies.filter(movie => movie.id === movieId)
      .map(mov => mov.description.categories)

    return categories[0].join(", ")
  }

  function getAllCategories() {
    let categories = []
    let allSingleCategories = []
    let allCat = movies.map(movie => movie.description.categories)
    allCat.forEach(categories => categories.forEach(cat => allSingleCategories.push(cat)))
    categories = [...new Set(allSingleCategories)]
    categories.sort()
    categories.unshift("All Categories");
    return categories
  }



  return <>

    <h2 className="p2 mb-3">Movies In Cinema Now</h2>

    <Container className="mb-4">
      <Row >
        <Col sm={4}>
          {/* onChange={handleCategoryChange} */}
          <Form.Select aria-label="Default select example" onChange={handleCategoryChange} >
            {getAllCategories().map(cat =>
              <option key={cat}>{cat}</option>
            )}
          </Form.Select>
        </Col>
        <Col m={8}></Col>
      </Row>
    </Container>



    {movieData.map(({ movieId, movieId, poster, screeningDay, screeningDate, screeningHrs,
      screeningMins, categories, movieTitle, duration }) =>

      <NavLink key={movieId} to={'/movie-details/' + movieId}>
        <Container>
          <Card className=" movCard mb-3">
            <Row >
              <Col className="cardImageCol" sm={4}>
                <Card.Img className="img-card" variant="top" src={poster} />
              </Col>

              <Col sm={8}>
                <Card.Body className="body-card">

                  <Card.Text>
                    {screeningDay}, {screeningDate} at {screeningHrs}:{screeningMins}
                  </Card.Text>

                  <Card.Text>{categories}</Card.Text>

                  <Card.Title>{movieTitle}</Card.Title>

                  <Card.Text>Duration: {duration}</Card.Text>

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

