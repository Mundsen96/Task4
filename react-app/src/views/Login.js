import {Link} from 'react-router-dom';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Login() {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to={'/login'}>Log In</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name of User</Form.Label>
          <Form.Control type="text" placeholder="Name" />
          <Form.Text className="text-muted">
            Type in your username.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <div>
        <span>Don't have an account yet? </span>
        <Link to={'/register'}>Register</Link>
      </div>
    </div>
  );
}

export default Login;
