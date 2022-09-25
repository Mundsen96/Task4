
import {Link} from 'react-router-dom';
import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Stack from 'react-bootstrap/Stack';

export default function Navigate() {

  return (
  <Navbar bg="primary" expand="md">
    <Stack direction='horizontal' gap={5} className="mx-auto">
        <Link className="nav-link bg-secondary text-white rounded-pill px-2" to={'/'}>Main Page</Link>
        <div className="vr" />
        <Link className="nav-link bg-secondary text-white rounded-pill px-2" to={'/mainpage'}>User data</Link>
        <div className="vr" />
        <Link className="nav-link bg-secondary text-white rounded-pill px-2" to={'/login'}>Log In</Link>
    </Stack>
  </Navbar>
  );
}