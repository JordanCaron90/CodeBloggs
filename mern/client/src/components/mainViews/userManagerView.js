import React from 'react';
import { useState, useEffect} from 'react';
import { getCookie } from 'react-use-cookie';
import { useNavigate } from "react-router";
import {Link} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pagination from 'react-bootstrap/Pagination';
import Modal from 'react-bootstrap/Modal'
//import img1 from '../../images/caret_down_icon.png';
//import passwordIcon from "../../images/padlock_321783.png";

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
  const [filter, setFilter] = useState({ 
    first_name: "",
    last_name: "",
  });
  const [firstNameImg, setFirstNameImg] = useState('../../images/caret_vertical_icon.png');
  const [lastNameImg, setLastNameImg] = useState('../../images/caret_vertical_icon.png');
  const firstOrder = "asc";
  const lastOrder = "desc"
  const limit = 4;
  const navigate = useNavigate();
  
  const handlePaginationClick = (i) => {
    if(i >= 1 && i <= numPages){
      setPage(i);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleFirstClick = async (e) => {
    
  };

  const handleLastClick = async (e) => {
    
  };


  const getTableData = async () =>{

    try {
      const fetchResponse = await fetch(`http://localhost:5000/all-users/${page}/${limit}?`);
      const data = await fetchResponse.json();
      return data;
    } 
    catch (e) {
      console.log(e.message);
    }   

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
        try {
            const fetchResponse = await fetch(`http://localhost:5000/user-count`);
            const data = await fetchResponse.json();
            return data;
        } catch (e) {
            return e;
        }   
    };

    const getUsersPaginated = async () => {

      try {
        const fetchResponse = await fetch(`http://localhost:5000/all-users/${page}/${limit}`);
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
    

  },[numPages, page]);

  function displayPagination(){
    let pagination = [];
    console.log("Num pages: " + numPages)
    for(let i = 1; i <= numPages; i++){
      pagination.push(<Pagination.Item key={i} active={i === page} onClick={() => handlePaginationClick(i)}>{i}</Pagination.Item>);
    }
    return pagination
  }

  function userList() {

    let filtered = [];
    if(page != numPages)
        
    for(let i = 0; i < 10; i++){

      }

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

    async function deleteUser(id) {
      await fetch(`http://localhost:5000/user/delete/${id}`, {
        method: "DELETE"
      });
  
      const newUsers = users.filter((el) => el._id !== id);
      setUsers(newUsers);
    }

  return (
    <div>
      <Container style={{padding: "5rem"}}>
      <form onSubmit={handleSubmit}>
        <Row xs={1} md={3}>
            <Col className='w-50' style={{padding: "10px"}}>
                <Form.Control  type="text" placeholder="First Name" />
            </Col>
            <Col className='w-50' style={{padding: "10px"}}>
                <Form.Control type="text" placeholder="Last Name" />
            </Col>
            <Col>
            <Button variant="primary">Search</Button>
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
                    <img src={firstNameImg} alt="first_name_icon" />
                  </th>
                  <th onClick={handleLastClick}>
                    Last Name
                    <img src={lastNameImg} alt="last_name_icon" />
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
