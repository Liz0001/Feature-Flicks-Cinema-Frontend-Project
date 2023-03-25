
import { useStates } from '../utilities/states'
import Booking from "../components/Booking";

export default function DisplaySeats() {

  const ms = useStates("oneMovie")

  const sel = useStates('selectedSeats', {
    selected: 0
  })

  function countSelected(nestedArray) {
    let count = 0;
    nestedArray.forEach((innerArray) => {
      innerArray.forEach((obj) => {
        if (obj.selected === true) {
          count++;
        }
      });
    });
    return count;
  }


  function toggleSeatSelection(seat) {

    if (seat.occupied) { return; }

    seat.selected = !seat.selected;
    sel.selected = countSelected(ms.seats)
  }



  return <>

    <h3 className="mt-4 mb-3 text-center">2. Choose your seats:</h3>
    <p className="text-muted mb-3 text-center"><small>{sel.selected} seats selected! </small></p>


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

    <Booking />
  </>
}