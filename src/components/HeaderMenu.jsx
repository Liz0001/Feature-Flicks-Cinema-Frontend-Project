import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import { NavLink } from "react-router-dom"

export default function HeaderMenu() {

  return (
    <Navbar className="mainNav bg-gradient" collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="align-center">
          <img className="logo" src="/logo.svg" />
          <p className="logo-text">Feature Flicks</p>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">

          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/movies">Movies</Nav.Link>
            <Nav.Link as={NavLink} to="/contact-us">Contact Us</Nav.Link>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
