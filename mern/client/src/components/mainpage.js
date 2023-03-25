import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import profile from "../assets/images/CodeBloggs graphic.png"
import "../Style.css";
import Card from 'react-bootstrap/Card';

export default function User() {
  const [form, setForm] = useState({
    user_id: "",
  });
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  function updateForm(value) {
    setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/record/`);
          
      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
    
      const records = await response.json();
      setRecords(records);
    }
    
    getRecords();
  }, []);

  return (
    <div className="main">
      <div className="sub-main">
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
      </div>
    </div>
  );
}





// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import profile from "../assets/images/CodeBloggs graphic.png"
// import "../Style.css";
// import Card from 'react-bootstrap/Card';

// export default function User() {
//   const [user_id, setUser_id] = useState("");
//   const navigate = useNavigate();

//   function onSubmit(e) {
//     e.preventDefault();
//     // perform any necessary actions with the user_id value here
//     navigate(`/users/${user_id}`);
//   }

//   return (
//     <div className="main">
//       <div className="sub-main">
//         <div className="blog">
//           <div className="container-images">
//             <img src={profile} alt="profile" className="profile" />
//           </div>
//           <div className="card-container">
//             <Card style={{ width: '30rem', margin: '1rem', height: '20rem' }}>
//               <Card.Body>
//                 <Card.Title>Initial</Card.Title>
//                 <Card.Subtitle className="mb-2 text-muted">View User</Card.Subtitle>
//                 <Card.Text>
//                   View a specific user by ID.
//                 </Card.Text>
//                 <form onSubmit={onSubmit}>
//                   <label>
//                     User ID:
//                     <input type="text" value={user_id} onChange={(e) => setUser_id(e.target.value)} />
//                   </label>
//                   <button type="submit">View User</button>
//                 </form>
//               </Card.Body>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

