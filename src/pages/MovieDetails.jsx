
import { useParams } from 'react-router-dom'
import { useStates } from '../utilities/states';
import { getDuration } from "../utilities/duration"

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'

import DisplaySeats from '../components/DisplaySeats'


export default function MovieDetails() {

  const { slug } = useParams()
  const s = useStates("screenings")
  const screening = s.screenings.find(mov => mov.slug == slug)
  if (!screening) {
    return null
  }
  // console.log("Screening data", screening)



  return <>
    <Container>
      <Row>
        <Col md={7}>
          <h3>{new Intl.DateTimeFormat('en-SE', {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          }).format(new Date(screening.time))}</h3>
          <h2>{screening.movieTitle}</h2>
          <p>{screening.categories.join(" / ")}</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut labore nam necessitatibus doloribus culpa voluptas deserunt tempore laborum facere quam!</p>
          <p>Duration: {getDuration(screening.movieDuration)}</p>
        </Col>
        <Col md={5} className="text-center">
          <Card.Img className="detail-img-card" variant="top" src={"https://cinema-rest.nodehill.se/" + screening.moviePoster} alt={screening.movieTitle} />
        </Col>
      </Row>
      <Row>

        <h3 className="mt-4 mt-3 text-center">Choose your seats:</h3>
        <DisplaySeats screeningId={screening.id} auditoriumId={screening.auditoriumId} />
        {/* <Booking /> */}
      </Row>
    </Container>

  </>
}