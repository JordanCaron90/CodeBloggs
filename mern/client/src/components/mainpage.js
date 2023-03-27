import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Cookies from 'js-cookie';
import "../Style.css";
import profile from "../assets/images/CodeBloggs graphic.png";
import emailIcon from "../assets/images/emailLgo.png"
import passwordIcon from "../assets/images/padlock_321783.png"

export default function User() {
  const session_id = Cookies.get('token');
  const [user_id, setUserId] = useState([]);
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getRecords() {
      try {
        const response = await fetch(`http://localhost:5000/session/${session_id}`);
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          throw new Error(message);
        }
        const responseData = await response.json();
        console.log(responseData); // add this line to check the response data
        const user = responseData.data.user;
        console.log(user); // add this line to check the user data
        setRecords([user]);
        
      } catch (error) {
        console.error(error);
        window.alert("Error fetching records");
      }
    }
    getRecords();
  }, [session_id]);
  
  return (
    <div className="main">
      <div className="sub-main1">
        <div className="blog">
          <div className="container-images">
            <img src={profile} alt="profile" className="profile" />
          </div>
          <div className="card-container">
            {records.map((user) => (
                <Card style={{ width: '30rem', margin: '1rem', height: '20rem' }} key={user._id}>
                <Card.Body>
                    <Card.Title>{user.first_name}</Card.Title>
                    <Card.Text>{user.birthday}</Card.Text>
                    <button onClick={() => navigate(`/user/${user._id}`)}>View User</button>
                </Card.Body>
                </Card>
                 ))}
          </div>
        </div>
       
          <div className="card-container">
            <Card style={{ width: '30rem', margin: '1rem', height: '30rem' }}>
              <Card.Body>
                <Card.Title>Bloggs</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Create, View</Card.Subtitle>
                
                <Card.Link href=""></Card.Link>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>

  );
}
