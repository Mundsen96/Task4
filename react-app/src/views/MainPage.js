import Table from 'react-bootstrap/Table';
import React, { useState, useEffect } from 'react';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import unblockIcon from '../icons/unblock.svg';
import deleteIcon from '../icons/delete.svg';
import { handleInputs, handleToPost } from '../functions/dataHandler';
import {axiosInstance} from '../config';
// import Axios from 'axios';
import Navigate from './Nav';
import {useNavigate} from 'react-router-dom';

function MainPage() {
  const [serverData, setServerData] = useState(null);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get('/users', {withCredentials: false})
    .then(users => {
      console.log(users);
      if(!users.data){
        return navigate('/login');
      }
      setServerData(users.data.map((user, index) => Object.assign({}, user, { id: index + 1 })))
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);

  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(serverData.map((li) => li._id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  const handleButtons = (type) => {
    let checkedInputs = handleInputs(
      document.querySelectorAll("input[type='checkbox']")
    );
    let postData = handleToPost(serverData, checkedInputs, type);
    setServerData(postData);
    axiosInstance.post('/users', {postData}, {withCredentials: false})
    .then(res => {
      if(!res.data){
        return navigate('/login');
      }
    })
    .catch(err => console.log(err))
  };


  return (
    <div>
      <Navigate/>
      `<Stack className="mx-auto w-50">
 
      <h1>Users</h1>
      <Stack direction="horizontal" gap={5}>
        <Button className="px-5" variant="danger" onClick={() => handleButtons('blocked')}>
          Block
        </Button>
        <button type="button" className="btn btn-primary px-5">
          <img src={unblockIcon} alt="Unblock Icon" onClick={() => handleButtons('active')} />
        </button>
        <button type="button" className="btn px-5" onClick={() => handleButtons(null)}>
          <img src={deleteIcon} alt="delete Icon" />
        </button>
      </Stack>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                name="selectAll"
                id="selectAll"
                onChange={handleSelectAll}
                checked={isCheckAll}
              />
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
          {serverData &&
            serverData.map((user, key) => (
              <tr key={user._id}>
                <td>
                  <input
                    type="checkbox"
                    id={user._id}
                    onChange={handleClick}
                    checked={isCheck.includes(user._id)}
                  />
                </td>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.lastTimeLogged}</td>
                <td>{user.registrationTime}</td>
                <td>{user.status}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Stack>
    </div>
  );
}
// id, name, e-mail, last login time, registration time, status (active/blocked)
export default MainPage;
