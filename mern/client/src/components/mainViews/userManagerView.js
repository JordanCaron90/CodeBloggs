import React from 'react';
import { useState, useEffect} from 'react';
import { getCookie } from 'react-use-cookie';
import { useNavigate } from "react-router";
import {Link} from "react-router-dom";

//Bootstrap
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pagination from 'react-bootstrap/Pagination';
import Modal from 'react-bootstrap/Modal'

//Images
import verticalCaret from '../../images/caret_vertical_icon.png';
import upCaret from '../../images/caret_up_icon.png';
import downCaret from '../../images/caret_down_icon.png';

function User(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {setShow(true)};

  return(
    <>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Deleting User</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => {props.deleteUser(props.user._id)}}>
              Delete User
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <tr>
        <td>{props.user.first_name}</td>
        <td>{props.user.last_name}</td>
        <td>
          <Link className="btn btn-link" to={`/edit/${props.user._id}`}>
            Edit
          </Link> |
          <button className="btn btn-link"onClick={handleShow}>
            Delete
          </button>
        </td>
      </tr>
    </>
  );
}

export default function UserManagerView() {
  const [users,setUsers] = useState([]);
  const [page, setPage] = useState(()=> {return 1});
  const [numPages, setNumPages] = useState(()=>{return 1});
  const [numUsers, setNumUsers] = useState(() => {return 0});
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName]= useState("");
  const [firstNameImg, setFirstNameImg] = useState(verticalCaret);
  const [lastNameImg, setLastNameImg] = useState(verticalCaret);
  const [order, setOrder] = useState("desc");
  const [sortField, setSortField] = useState("");
  const limit = 4;
  const url = `http://localhost:5000/all-users/${page}/${limit}?first_name=${first_name}&last_name=${last_name}&sort_by=${sortField}&order=${order}`;
  const navigate = useNavigate();
  
  const handlePaginationClick = (i) => {
    if(i >= 1 && i <= numPages){
      setPage(i);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPage(1);
    setFirstNameImg(verticalCaret);
    setLastNameImg(verticalCaret);
    setOrder("desc");
    setSortField("");
    setFirstName("");
    setLastName("");
  };

  const handleFirstClick = async (e) => {
    resetImages();
    setSortField("first_name")
    if(order === "desc"){
      setOrder("asc");
      setFirstNameImg(upCaret);
    }
    else{
      setOrder("desc");
      setFirstNameImg(downCaret);
    }

    setPage(1);
  };

  const handleLastClick = async (e) => {
    resetImages();
    setSortField("last_name")
    if(order === "desc"){
      setOrder("asc");
      setLastNameImg(upCaret);
    }
    else{
      setOrder("desc");
      setLastNameImg(downCaret);
    }

    setPage(1);
  };

  useEffect(async() => {

    const getUser = async () => {

      const token = getCookie('token');
        
      try {
          const fetchResponse = await fetch(`http://localhost:5000/session/${token}`);
          const data = await fetchResponse.json();
          return data;
      } 
      catch (e) {
        navigate("/");
      }   

    };

    const response = await getUser();
    if(response.type == "error"){
        navigate("/");
    }
  });

  useEffect(async() => {

    const getUserCount = async () => {

      let countUrl = `http://localhost:5000/user-count?first_name=${first_name}&last_name=${last_name}`;
        
        try {
            const fetchResponse = await fetch(countUrl);
            const data = await fetchResponse.json();
            return data;
        } catch (e) {
            return e;
        }   
    };

    const getUsersPaginated = async () => {
      try {
        const fetchResponse = await fetch(url);
        const data = await fetchResponse.json();
        return data;
      } 
      catch (e) {
        return e;
      } 

    }

      const countResponse = await getUserCount();
      setNumUsers(parseInt(countResponse.data));
      setNumPages(Math.ceil(numUsers/limit));

      const usersResponse = await getUsersPaginated();
      setUsers(usersResponse.data);
    

  },[numPages, page, sortField, order, first_name, last_name, users.length]);

  function displayPagination(){
    let pagination = [];
    console.log("Num pages: " + numPages)
    for(let i = 1; i <= numPages; i++){
      pagination.push(<Pagination.Item key={i} active={i === page} onClick={() => handlePaginationClick(i)}>{i}</Pagination.Item>);
    }
    return pagination
  }

  function userList() {
      return users.map((user) => {
        return (
          <User
            user={user}
            deleteUser={() => deleteUser(user._id)}
            key={user._id}
          />
        );
      });
  }

  function updateFirst(first){
    setFirstName(first);
    setPage(1);
  }

  function updateLast(last){
    setLastName(last);
    setPage(1);
  }

  async function deleteUser(id) {
    const response = await fetch(`http://localhost:5000/user/delete/${id}`, {
      method: "DELETE"
    });
    const json = await response.json();
    if(json.type === "error"){
      console.log("error");
    }
    const newUsers = users.filter((el) => el._id !== id);
    setUsers(newUsers);
    setPage(1);
  }

  function resetImages(){
    setFirstNameImg(verticalCaret);
    setLastNameImg(verticalCaret);
  }

  return (
    <div>
      <Container style={{padding: "5rem"}}>
      <form onSubmit={handleSubmit}>
        <Row xs={1} md={3}>
            <Col className='w-50' style={{padding: "10px"}}>
                <Form.Control
                  type="text" 
                  placeholder="First Name"
                  name="firstName"
                  value={first_name}
                  onChange={(e) => updateFirst(e.target.value)}
                />
            </Col>
            <Col className='w-50' style={{padding: "10px"}}>
                <Form.Control
                  type="text" 
                  placeholder="Last Name"
                  name="lastName"
                  value={last_name}
                  onChange={(e) => updateLast(e.target.value)}
                />
            </Col>
            <Col>
            <Button type="submit" variant="primary">Reset Filters</Button>
            </Col>
        </Row>
        </form>
        <div>
          <h3>Users</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
              <thead>
                <tr>
                  <th onClick={handleFirstClick}>
                    First Name
                    <img src={firstNameImg} alt="first_name_icon" style={{height: "auto", maxWidth: "3%"}} />
                  </th>
                  <th onClick={handleLastClick}>
                    Last Name
                    <img src={lastNameImg} alt="last_name_icon" style={{height: "auto", maxWidth: "3%"}}/>
                  </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{userList()}</tbody>
            </table>
        </div>
        <Row>
          <Pagination>
            <Pagination.First onClick={() => handlePaginationClick(1)} />
            <Pagination.Prev onClick={() => handlePaginationClick(page - 1)}/>
              {displayPagination()}
            <Pagination.Next onClick={() => handlePaginationClick(page + 1)}/>
            <Pagination.Last onClick={() => handlePaginationClick(numPages)}/>
          </Pagination>
        </Row>
      </Container>
    </div>
  )
}
