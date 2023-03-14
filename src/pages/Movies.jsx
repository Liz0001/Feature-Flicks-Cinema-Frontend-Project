
import { NavLink } from "react-router-dom"
import { useState, useEffect } from "react";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';



export default function Movies() {

  const [movies, setMovies] = useState([]);
  const [screenings, setScreenings] = useState([])
  const [moviesByCategory, setMoviesByCategory] = useState([])
  const [movieCategories, setMovieCategories] = useState([])

  useEffect(() => {
    (async () => {
      setMovies(await (await (fetch("/api/movies"))).json())
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setScreenings(await (await (fetch("/api/screenings"))).json())
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setMoviesByCategory(await (await (fetch("/api/movies_by_category"))).json())
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setMovieCategories(await (await (fetch("/api/categories"))).json())
    })();
  }, []);




  const handleCategoryChange = (event) => {

    // setMovieCategories(event.target.value)
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


  // screenings.filter((item) => {
  //   console.log(item.movieId)
  // })

  // movies.filter(movie => movie.id === movieId).map(mov => mov.description.categories
  // category === "All Categories" || item.movieId === movie
  // //   getCategorie(item.movieId).toLowerCase();
  // //   category === "All Categories" || movieCategory.includes(category);
  // // }))



  // console.log(movieCategories)

  // const displayMovies = screenings.filter((item) => {
  //   const movieCategory = getCategorie(item.movieId).toLowerCase();
  //   return category === "All Categories" || movieCategory.includes(category);
  // });
  // console.log(m)

  // screenings.map(mov => mov.movieId.map(id => movies.id) )

  // === "All Categrories"
  // || scrItem.movieId === moviesXcategories.movieId && moviesXcategories.categoryID === movieCategories.id && movieCategories.title === movieCategories))

  //////////////////////////////
  // movies and category filter

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


    {screenings.map(({ id, movieId, time }) =>

      <NavLink key={id} to={'/movie-details/' + id}>
        <Container>
          <Card className="movCard mb-3">
            <Row >
              <Col className="cardImageCol" sm={4}>
                <Card.Img className="img-card" variant="top" src={getImage(movieId)} />
              </Col>

              <Col sm={8}>
                <Card.Body className="body-card">

                  <Card.Text>
                    {getMovDay(time)}, {getMovDate(time)} at {getMovHours(time)}:{getMovMins(time)}
                  </Card.Text>

                  <Card.Text>{getCategorie(movieId)}</Card.Text>

                  <Card.Title>{getTitle(movieId)}</Card.Title>

                  <Card.Text>Duration: {getDuration(movieId)}</Card.Text>

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

