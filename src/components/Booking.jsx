

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useNavigate } from 'react-router-dom';
import { useStates } from '../utilities/states';



export default function Booking() {


  const navigate = useNavigate();

  const tt = useStates('ticketTypes')
  const sel = useStates('selectedSeats')



  async function submit(event) {
    event.preventDefault();
    if (tt.total === 0) { return; }
    if (tt.total != sel.selected) { return; }

    navigate('/your-receipt');
  }


  return <>

    <Row className="mt-3">
      <Col className="text-center my-3">

        <p><small>Make sure that you have same number of Seats as Tickets</small></p>

        <Form onSubmit={submit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter your email to book</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required />
          </Form.Group>


          <Button variant="outline-primary" type="submit">
            Book the seats
          </Button>
        </Form>


      </Col>
    </Row>

  </>
}