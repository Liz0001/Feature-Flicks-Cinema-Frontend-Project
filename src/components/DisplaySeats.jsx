
import { useStates } from '../utilities/states'
import { useEffect } from 'react'

export default function DisplaySeats({ screeningId, auditoriumId }) {

  const ms = useStates({
    movieScreening: null,
    seats: []
  });

  useEffect(() => {
    (async () => {

      let movieScreening = (await (await fetch(
        `/api/occupied_seats?screeningId=${screeningId}`))
        .json())[0]

      movieScreening.occupiedSeats = movieScreening
        .occupiedSeats.split(', ')
        .map(x => +x)

      ms.movieScreening = movieScreening

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



  function toggleSeatSelection(seat) {
    if (seat.occupied) { return; }
    seat.selected = !seat.selected;
  }

  return <>
    <div className="seats">
      {ms.seats.map(row => <><div key={row} className="row">
        {row.map((seat) => <div key={seat.id} className={
          (seat.selected ? 'selected' : '')
          + (seat.occupied ? ' occupied' : '')
        }
          onClick={() => toggleSeatSelection(seat)}>{seat.seatNumber}
        </div>)}
      </div><br /></>)}
    </div>

  </>

}