import React from 'react'
import { useEffect, useState } from 'react';
import { getCookie } from 'react-use-cookie';
import UserCard from './UserCard';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import "bootstrap/dist/css/bootstrap.min.css";

export default function NetworkView() {
    const [userId, setUserId] = useState();
    const [users, setUsers] = useState([]);
    const columnsPerRow = 4;

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
            console.log(response.data)
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

  return (
    // <div style={{marginLeft: 200}}>
    <Container fluid>
        <Row xs={1} md={columnsPerRow}>
            {userList()}
        </Row>
    </Container>
    // </div>
  )
}
