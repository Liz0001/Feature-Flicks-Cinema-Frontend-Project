
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useStates } from '../utilities/states';
import { getDuration } from "../utilities/duration"

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'

import DisplaySeats from '../components/DisplaySeats'
import ChooseTickets from "../components/ChooseTickets";


export default function MovieDetails() {

  const s = useStates("screenings")

  const { slug, id } = useParams()
  const screening = s.screenings.find(mov => mov.slug == slug)


  if (!screening) {
    return null
  }

  const ms = useStates("oneMovie", {
    movieScreening: {},
    seats: [],
    emptySeats: 0
  });


  useEffect(() => {
    (async () => {
      let movieScreening = (await (await fetch(
        `/api/occupied_seats?screeningId=${id}`)) //screeningId
        .json())[0]

      movieScreening.occupiedSeats = movieScreening
        .occupiedSeats.split(', ')
        .map(x => +x)

      ms.movieScreening = movieScreening

      // // empty number of seats
      ms.emptySeats = (movieScreening.total - movieScreening.occupied)

      let auditoriumId = ['Stora Salongen', 'Lilla Salongen']
        .indexOf(ms.movieScreening.auditorium) + 1;

      let seats = await (await fetch(
        `/api/seats/?auditoriumId=${auditoriumId}&sort=seatNumber`)).json()

      let rows = [];
      let row;
      let latestRow;

      for (let seat of seats) {
        // Add a new property: Is the seat occupied? (true/false)
        seat.occupied = movieScreening.occupiedSeats.includes(seat.seatNumber)
        // Arrange seats into rows
        if (latestRow !== seat.rowNumber) {
          row = []
          rows.push(row)
        }
        row.push(seat)
        latestRow = seat.rowNumber
      }
      ms.seats = rows
    })()
  }, [])



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
      <hr />

      <Row>
        <ChooseTickets seats={ms.emptySeats} />
      </Row >

      <Row>
        <DisplaySeats />
      </Row>



    </Container>
  </>
}