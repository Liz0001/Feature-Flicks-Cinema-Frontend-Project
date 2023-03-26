
import { NavLink } from "react-router-dom"
import { useStates } from '../utilities/states'
import { getDuration } from "../utilities/duration"

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'

export default function Movies() {

  const s = useStates("screenings")
  const c = useStates("movieCategories")

  const handleCategoryChange = (event) => {
    c.catFilter = event.target.value
  }


  //////////////////////////////
  // Categories
  function getAllCategories() {
    let allCat = c.movieCategories.map(cat => cat.title)
    allCat.sort()
    allCat.unshift("All Categories")
    return allCat
  }



  return <>
    <h2 className="p2 mb-3">Movies In Cinema Now</h2>

    <Container className="mb-4">
      <Row >
        <Col md={4}>
          <Form.Select value={c.catFilter} aria-label="Default select example" onChange={handleCategoryChange} >
            {getAllCategories().map(cat =>
              <option key={cat}>{cat}</option>
            )}
          </Form.Select>
        </Col>
        <Col md={8}></Col>
      </Row>
    </Container>


    {s.screenings.filter(({ categories }) => (
      c.catFilter === "All Categories" || categories.includes(c.catFilter)
    )).map(({ id, movieId, time, movieTitle, movieDuration, categories, moviePoster, slug }) =>

      <NavLink key={id} to={'/movie-details/' + slug + "/" + id} >
        <Container>
          <Card className="movCard mb-3">
            <Row >

              <Col className="cardImageCol" md={4}>
                <Card.Img className="img-card" variant="top" src={"https://cinema-rest.nodehill.se/" + moviePoster} alt={movieTitle} />
              </Col>
              <Col md={8}>

                <Card.Body className="body-card">
                  <Card.Text>
                    {new Intl.DateTimeFormat('en-SE', {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    }).format(new Date(time))}
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
