import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export default function Contact() {

  return <>
    <h2 className="mb-4">Contact us</h2>
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" />
      </Form.Group>


      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Topic</Form.Label>

        <Form.Control type="text" placeholder="Booking issue, movie question, ..." />
      </Form.Group>


      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Message</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>

      <Button variant="outline-primary" type="submit">
        Send
      </Button>
    </Form>
  </>

}