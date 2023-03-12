import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import { NavLink } from "react-router-dom"


export default function MainMenu() {

  return (
    <Navbar className="mainNav" collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Container>
        <Nav.Link as={NavLink} to="/">
          <Navbar.Brand href="/" className="align-center">
            <img className="logo" src="./logo.svg" />
            <p className="logo-text">Feature Flicks</p>
          </Navbar.Brand>
        </Nav.Link>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">

          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/Movies">Movies</Nav.Link>
            <Nav.Link as={NavLink} to="/Contact-Us">Contact Us</Nav.Link>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar >
  )

}
