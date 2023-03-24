
import { useStates } from '../utilities/states'

export default function DisplaySeats() {

  const ms = useStates("oneMovie");


  function toggleSeatSelection(seat) {
    if (seat.occupied) { return; }
    seat.selected = !seat.selected;
  }

  return <>
    <h3 className="mt-4 mb-3 text-center">2. Choose your seats:</h3>
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