
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { useStates } from '../utilities/states';


export default function ChooseTickets({ seats }) {

  const t = useStates("tickets")

  const child = t.tickets.find(movTickets => movTickets.name == "Child")
  const senior = t.tickets.find(movTickets => movTickets.name == "Senior")
  const adult = t.tickets.find(movTickets => movTickets.name == "Adult")

  if (!child || !senior || !adult) {
    return null;
  }

  ////////////////////

  const tt = useStates('ticketTypes', {
    childTic: 0,
    seniorTic: 0,
    adultTic: 0,
    total: 0,
    totalSEK: 0
  })

  ////////////////////
  // functions for counters
  function minus(counter, ticketType) {
    // console.log(ticketType, counter)
    if (counter == 0)
      return
    if (counter > 0 && ticketType === "child") {
      tt.childTic--;
    }
    if (counter > 0 && ticketType === "senior") {
      tt.seniorTic--;
    }
    if (counter > 0 && ticketType === "adult") {
      tt.adultTic--;
    }
    tt.total--;
    tt.totalSEK = calcTotal()
  }


  function addChild(counter) {
    if (seatsAvailable(counter) !== tt.childTic) {
      tt.childTic++;
      tt.total++;
      tt.totalSEK = calcTotal()
    }
  }
  function addSenior(counter) {
    if (seatsAvailable(counter) !== tt.seniorTic) {
      tt.seniorTic++;
      tt.total++;
      tt.totalSEK = calcTotal()
    }
  }
  function addAdult(counter) {
    if (seatsAvailable(counter) !== tt.adultTic) {
      tt.adultTic++;
      tt.total++;
      tt.totalSEK = calcTotal()
    }
  }

  ////////////////////

  function seatsAvailable(curr) {
    let chosen = (tt.childTic + tt.seniorTic + tt.adultTic)
    let left = seats - chosen
    return curr + left
  }

  function calcTotal() {
    return tt.childTic * Number(child.price) + tt.seniorTic * Number(senior.price) + tt.adultTic * Number(adult.price)
  }


  return <>

    <h3 className="mt-4 mb-3 text-center">1. Choose your tickets:</h3>

    <Container className="text-center">

      <p className="text-center ticketArea">
        <span> {child.name} </span>
        <span className="priceArea"> {child.price} SEK </span>
        <span className={"btnArea" + child.name}>
          <Button onClick={() => minus(tt.childTic, "child")}
            className={"btn" + child.name + "Minus"} variant="outline-secondary"> - </Button>
          {tt.childTic}
          <Button onClick={() => addChild(tt.childTic)}
            className={"btn" + child.name + "Plus"} variant="outline-secondary"> + </Button>
        </span>
      </p>


      <p className="text-muted printText"> <small>under 12</small></p>
      <div className="line text-center"></div>


      <p className="text-center ticketArea">
        <span> {senior.name} </span>
        <span className="priceArea"> {senior.price} SEK </span>
        <span className={"btnArea" + senior.name}>
          <Button onClick={() => minus(tt.seniorTic, "senior")}
            className={"btn" + senior.name + "Minus"} variant="outline-secondary"> - </Button>
          {tt.seniorTic}
          <Button onClick={() => addSenior(tt.seniorTic)}
            className={"btn" + senior.name + "Plus"} variant="outline-secondary"> + </Button>
        </span>
      </p>


      <p className="text-muted printText"> <small>above 65</small></p>
      <div className="line text-center"></div>


      <p className="text-center ticketArea">
        <span> {adult.name} </span>
        <span className="priceArea"> {adult.price} SEK </span>
        <span className={"btnArea" + adult.name}>
          <Button onClick={() => minus(tt.adultTic, "adult")}
            className={"btn" + adult.name + "Minus"} variant="outline-secondary"> - </Button>
          {tt.adultTic}
          <Button onClick={() => addAdult(tt.adultTic)}
            className={"btn" + adult.name + "Plus"} variant="outline-secondary"> + </Button>
        </span>
      </p>

      <p className="text-center mt-3">Total: {calcTotal()} SEK </p>
      <p className="text-center mb-4 text-muted"><small>{tt.total}  tickets selected</small></p>
    </Container >
    <hr />
  </>
}