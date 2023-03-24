
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { useState } from 'react';
import { useStates } from '../utilities/states';



export default function ChooseTickets() {

  const ms = useStates("oneMovie")


  const t = useStates("tickets")
  if (!t.tickets)
    return null


  const child = t.tickets.find(movTickets => movTickets.name == "Child")
  const senior = t.tickets.find(movTickets => movTickets.name == "Senior")
  const adult = t.tickets.find(movTickets => movTickets.name == "Adult")

  // console.log(child.name)


  const [childTicketCount, setCounter1] = useState(0);
  const [seniorTicketCount, setCounter2] = useState(0);
  const [adultTicketCount, setCounter3] = useState(0);

  function seatsAvailable(curr) {
    let seats = ms.emptySeats
    // console.log(seats)
    let chosen = (childTicketCount + seniorTicketCount + adultTicketCount)
    let left = seats - chosen
    return curr + left
  }

  function calcTotal() {
    return childTicketCount * Number(child.price) + seniorTicketCount * Number(senior.price) + adultTicketCount * Number(adult.price)
  }


  return <>

    <h3 className="mt-4 mb-3 text-center">1. Choose your tickets:</h3>
    {/* <p className="text-muted printText text-center"><small>Available seats to choose from: {seatsAvailable()}</small></p> */}


    <Container className="text-center">

      <p className="text-center ticketArea">
        <span> {child.name} </span>
        <span className="priceArea"> {child.price} SEK </span>
        <span className={"btnArea" + child.name}>

          <Button onClick={() => setCounter1(childTicketCount => Math.max(childTicketCount - 1, 0))}
            className={"btn" + child.name + "Minus"} variant="outline-secondary"> - </Button>
          {childTicketCount}
          <Button onClick={() => setCounter1(childTicketCount => Math.min(childTicketCount + 1,
            seatsAvailable(childTicketCount)))}
            className={"btn" + child.name + "Plus"} variant="outline-secondary"> + </Button>
        </span>
      </p>
      <p className="text-muted printText"> <small>under 12</small></p>
      <div className="line text-center"></div>

      <p className="text-center ticketArea">
        <span> {senior.name} </span>
        <span className="priceArea"> {senior.price} SEK </span>
        <span className={"btnArea" + senior.name}>

          <Button onClick={() => setCounter2(seniorTicketCount => Math.max(seniorTicketCount - 1, 0))}
            className={"btn" + senior.name + "Minus"} variant="outline-secondary"> - </Button>
          {seniorTicketCount}
          <Button onClick={() => setCounter2(seniorTicketCount => Math.min(seniorTicketCount + 1,
            seatsAvailable(seniorTicketCount)))}
            className={"btn" + senior.name + "Plus"} variant="outline-secondary"> + </Button>
        </span>
      </p>
      <p className="text-muted printText"> <small>above 65</small></p>
      <div className="line text-center"></div>

      <p className="text-center ticketArea">
        <span> {adult.name} </span>
        <span className="priceArea"> {adult.price} SEK </span>
        <span className={"btnArea" + adult.name}>

          <Button onClick={() => setCounter3(adultTicketCount => Math.max(adultTicketCount - 1, 0))}
            className={"btn" + adult.name + "Minus"} variant="outline-secondary"> - </Button>

          {adultTicketCount}

          <Button onClick={() => setCounter3(adultTicketCount => Math.min(adultTicketCount + 1,
            seatsAvailable(adultTicketCount)))}
            className={"btn" + adult.name + "Plus"} variant="outline-secondary"> + </Button>
        </span>
      </p>
      <p className="text-center mb-4">Total: {calcTotal()} SEK </p>
    </Container >
    <hr />
  </>
}