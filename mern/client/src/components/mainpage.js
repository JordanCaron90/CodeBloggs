import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Cookies from 'js-cookie';
import "../Style.css";

export default function User() {
  const user_id = Cookies.get('user_id');
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getRecords() {
      try {
        const response = await fetch(`http://localhost:5000/users/${user_id}`);
        console.log(user_id)
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          throw new Error(message);
        }
      
        const records = await response.json();
        setRecords(Array.isArray(records) ? records : []);
      } catch (error) {
        console.error(error);
        window.alert("Error fetching records");
      }
    }
    
    getRecords();
  }, [user_id]);

//   return (
//     <div>
//       {records.map((record) => (
//         <Card key={record.id}>
//           <Card.Body>
//             <Card.Title>{record.name}</Card.Title>
//             <Card.Text>{record.description}</Card.Text>
//             <button onClick={() => navigate(`/user/${record.id}`)}>View User</button>
//           </Card.Body>
//         </Card>
//       ))}
//     </div>
//   );
// }


  return (
    <div className="main">
      <div className="sub-main1">
        <div className="blog">
          <div className="container-images">
            <img src={profile} alt="profile" className="profile" />
          </div>
          <div className="card-container">
            <Card style={{ width: '30rem', margin: '1rem', height: '20rem' }}>
              <Card.Body>
                <Card.Title>Initial</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Create, View</Card.Subtitle>
                <Card.Text>
                  Contains all agents information and admin command.
                </Card.Text>
                <Card.Link href="">Go to Agent List</Card.Link>
              </Card.Body>
            </Card>
          </div>
        </div>

       
          <div className="card-container">
            <Card style={{ width: '30rem', margin: '1rem', height: '30rem' }}>
              <Card.Body>
                <Card.Title>Initial</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Create, View</Card.Subtitle>
                <Card.Text>
                  Contains all agents information and admin command.
                </Card.Text>
                <Card.Link href="">Go to Agent List</Card.Link>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>

  );
}

