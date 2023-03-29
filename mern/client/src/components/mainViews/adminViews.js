import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import { getCookie } from 'react-use-cookie';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
// import '../css/admin.css'

export default function AdminView() {
  const navigate = useNavigate();

  useEffect(async() => {

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

  },[]);

  return (
    <div style={{margin: 150}}>
      <Container fluid>
        <Row xs={1} md={4}> 
          <Col style={{margin: 50}}>
            <Card style={{ width: '22rem' }}>
              {/*<Card.Img variant="top" src="holder.js/100px180" />*/}
              <Card.Body>
                <Card.Title>User Manager</Card.Title>
                <Card.Text>
                  Manage the users' access priviliges and information.
                </Card.Text>
                <Button variant="primary">Manage User</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col style={{margin: 50}}>
            <Card style={{ width: '22rem' }}>
             {/* <Card.Img variant="top" src="holder.js/100px180" />*/}
              <Card.Body>
                <Card.Title>Content Manager</Card.Title>
                <Card.Text>
                  Manage the users's content such as posts and comments.
                </Card.Text>
                <Button variant="primary">Manage Content</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row> 
      </Container>
    </div>
  )
}
