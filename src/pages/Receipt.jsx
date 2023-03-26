import { useStates } from '../utilities/states';
import { NavLink } from "react-router-dom"
import Button from 'react-bootstrap/Button';

export default function Receipt() {

  const ms = useStates("oneMovie")
  const tt = useStates('ticketTypes')


  function generateBookingNumber() {
    let no = '';
    while (no.length < 3) {
      no += 'ABCDEFGHIJKLMNOPQRSTUVWZXYZ'[Math.floor(Math.random() * 26)];
    }
    while (no.length < 6) {
      no += Math.floor(Math.random() * 10);
    }
    return no;
  }

  return <>
    <p className="mb-5">Your Receipt:</p>
    <div className="px-5">

      <h2>Movie: {ms.movieScreening.movie} </h2>
      <p>{
        new Intl.DateTimeFormat('en-SE', {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        }).format(new Date(ms.movieScreening.screeningTime))
      }</p>

      <p>Price: {tt.totalSEK} SEK </p>

      <p>Booking number: {generateBookingNumber()}</p>


      <p>Your Seats:</p>
      {ms.seats.map(row => {
        return row.map(seat => {
          if (seat.selected) {
            return <p>Row {seat.rowNumber}, Seat {seat.seatNumber}</p>;
          } else {
            return null;
          }
        });
      })}
    </div>


    <p className="mt-5">Thank you for choosing Feature Flicks!</p>
    <p><small>Please check your inbox for a confirmation email and confirm the booking!</small></p>
    <p className="mb-3"><small>Show booking number and pay at the counter!</small></p>

    <NavLink to={'/movies/'} >

      <Button className="mt-3 mb-3" variant="outline-primary" type="submit">
        Check out other Movies
      </Button>
    </NavLink>

  </>

}