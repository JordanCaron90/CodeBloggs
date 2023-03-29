import React from 'react';
import { useEffect, useState } from 'react';
import { getCookie } from 'react-use-cookie';
import { useNavigate } from "react-router";
import UserCard from '../modal/UserCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/networkViews.css';

export default function NetworkView() {
    const [userId, setUserId] = useState();
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const columnsPerRow = 3;
  const [userId, setUserId] = useState();
  const [users, setUsers] = useState([]);
  const columnsPerRow = 3;

  useEffect(async() => {
    const getUser = async () => {
      const token = getCookie('token');
      try {
        const fetchResponse = await fetch(`http://localhost:5000/session/${token}`);
        const data = await fetchResponse.json();
        return data;
      } catch (e) {
        return e;
      }   
    };

        const getUser = async () => {
            const token = getCookie('token');
            
            try {
                const fetchResponse = await fetch(`http://localhost:5000/session/${token}`);
                const data = await fetchResponse.json();
                return data;
            } catch (e) {
                navigate("/");
            }   

        };

        const response = await getUser();
        if(response.type == "error"){
            navigate("/");
        }
        setUserId(response.data.user._id);

    },[]);
    const response = await getUser();
    setUserId(response.data.user._id);
  },[]);

    useEffect(async() => {

        const getUsersExceptSelf = async () => {
            try {
                const fetchResponse = await fetch(`http://localhost:5000/users/${userId}`);
                const data = await fetchResponse.json();
                return data;
            } catch (e) {
                return e;
            }   
        };
        if(userId){
            const response = await getUsersExceptSelf();
            setUsers(response.data);
        }

    },[userId]);
  useEffect(async() => {
    const getUsersExceptSelf = async () => {
      try {
        const fetchResponse = await fetch(`http://localhost:5000/users/${userId}`);
        const data = await fetchResponse.json();
        return data;
      } catch (e) {
        return e;
      }   
    };
    if(userId){
      const response = await getUsersExceptSelf();
      setUsers(response.data);
    }
  },[userId]);

    function userList() {
        return users.map((user) => {
          return (
            <Col key={user._id}>
                <UserCard user={user} key={user._id} />
            </Col>
          );
        });
    }
  },[userId]);

  function userList() {
    return users.map((user) => {
      return (
        <Col key={user._id} xs={12} md={4} lg={4} style={{marginBottom: '7.5px'}}>
          <UserCard user={user} key={user._id} style={{height: '150px', padding: '7.5px'}} />
        </Col>
      );
    });
  }

  return (
    <div style={{marginLeft: 50, marginRight: 50, marginTop: 100, marginBottom: 20}}>
      <Container fluid style={{maxWidth: '1200px'}}>
        <Row xs={1} md={columnsPerRow}>
          {userList()}
        </Row>
        <div className="recent-post" style={{marginTop: '20px'}}>
          {/* code for displaying recent post */}
        </div>
      </Container>
    </div>
  )
}
