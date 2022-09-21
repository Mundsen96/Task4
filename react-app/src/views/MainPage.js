import Table from 'react-bootstrap/Table';
import React, { useState, useEffect } from 'react';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

function MainPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/users')
      .then((res) => res.json())
      .then((users) => setData({ users }));
  }, []);

  return (
    <Stack gap={2} className="col-md-5 mx-auto">
      <h1>Users</h1>
      <Stack direction="horizontal" gap={3}>
        <Button variant="danger">Block</Button>
        <button type="button" class="btn btn-primary px-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-unlock-fill"
            viewBox="0 0 16 16"
          >
            <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2z" />
          </svg>
        </button>
        <button type="button" className="btn px-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-trash-fill"
            viewBox="0 0 16 16"
          >
            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
          </svg>
        </button>
      </Stack>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <input type="checkbox" name="pickAll" id="all" />
            </th>
            <th>#</th>
            <th>Username</th>
            <th>E-mail</th>
            <th>Last Login Time</th>
            <th>Registration Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.users.map((user, key) => (
              <tr key={user.id}>
                <td>
                  <input type="checkbox" id={user.id} />
                </td>
                <td>{user.id}</td>
                <td>{user.username}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Stack>
  );
}
// id, name, e-mail, last login time, registration time, status (active/blocked)
export default MainPage;
