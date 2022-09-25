import { useNavigate } from 'react-router-dom';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navigate from './Nav';
import Axios from 'axios';
import { transformToRegister } from '../functions/dataHandler';
import Alert from 'react-bootstrap/Alert';
import Stack from 'react-bootstrap/Stack';


function Register() {
  const [alertPassword, setAlertPassword] = React.useState(false);
  const [alertUser, setAlertUser] = React.useState(false);
  let navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    // setAlertPassword(false);
    let dataToSend = transformToRegister(event.target.elements);
    !dataToSend
      ? setAlertPassword(true)
      : Axios.post('/register', { dataToSend })
          .then((response) => {
            response.data && !alertPassword ? navigate('/login') : setAlertUser(true);
          })
          .catch((err) => console.log(err));
  }

  return (
    <div>
      <Navigate/>
      <Stack className="mx-auto w-50">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="UserName">
            <Form.Label>Name of User</Form.Label>
            <Form.Control type="text" placeholder="Name" />
            <Form.Text className="text-muted">Type in your username.</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="Email">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="Password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="ConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Register
          </Button>
          {alertPassword && (
            <Alert key="danger" variant="danger">
              The passwords do not match
            </Alert>
          )}
          {alertUser && (
            <Alert key="danger" variant="danger">
              User with this email already exist
            </Alert>
          )}
        </Form>
      </Stack>
    </div>
  );
}

export default Register;
