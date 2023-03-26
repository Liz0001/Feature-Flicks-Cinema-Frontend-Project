import { useStates } from '../utilities/states';


export default function Receipt() {

  // const t = useStates("tickets")
  const ms = useStates("oneMovie")
  const tt = useStates('ticketTypes')
  const sel = useStates('selectedSeats')

  // console.log(ms)
  // console.log(ms)

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

    <p className="mt-5">Thank you for choosing Feature Flicks!</p>
    <p><small>Please check your inbox for a confirmation email and confirm the booking!</small></p>
    <p className="mb-3"><small>Show booking number and pay at the counter!</small></p>



  </>

}