import {Link, useNavigate} from 'react-router-dom';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navigate from './Nav';
import Axios from 'axios';
import {transformToLogin} from '../functions/dataHandler';
import Alert from 'react-bootstrap/Alert';
import Stack from 'react-bootstrap/Stack';


function Login() {
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = React.useState(true);

  function handleSubmit(event) {
    event.preventDefault();
    let dataToSend = transformToLogin(event.target.elements);
    Axios.post('/login', {dataToSend}, {withCredentials: true})
      .then(response => {
        if(response.data){
          navigate('/mainpage');
        }else{
          setIsRegistered(false);
        }
      })
  }
  return (
    <div>
      <Navigate/>
      <Stack className="mx-auto w-50">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name of User</Form.Label>
            <Form.Control type="text" placeholder="Name" />
            <Form.Text  className="text-muted">
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
          {!isRegistered && <Alert key="danger" variant="danger">This user does not exist or is blocked. Please register or try again.</Alert>}
        </Form>
        <div>
          <span>Don't have an account yet? </span>
          <Link to={'/register'}>Register</Link>
      </div>
      </Stack>
    </div>
  );
}

export default Login;
