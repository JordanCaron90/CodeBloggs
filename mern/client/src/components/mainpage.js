// const Home = () => {
//     <div className="row">
//     <div className="col-xs-12 col-sm-2 col-md-3"></div>
//       <div className="col-sm-8 col-md-6">
//         {props.children}
//       </div>
//     <div className="col-xs-12 col-sm-2 col-md-3"></div>
//   </div>
//     return (
//       <div>
//       <h1>Home</h1>
//       </div>
//     );
//   }
  
//   export default Home

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import profile from "../assets/images/CodeBloggs graphic.png"
import "../Style.css";
import Card from 'react-bootstrap/Card';

export default function Create() {
  const [form, setForm] = useState({
    content: "",
    user_id: "",
  });
  const navigate = useNavigate();

  function updateForm(value) {
    setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    const newPerson = { ...form, time_stamp: new Date().getTime() };

    await fetch("http://localhost:5000/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    })
      .then(() => {
        setForm({
          content: "",
          user_id: "",
        });
        navigate("/");
      })
      .catch((error) => {
        window.alert(error);
        return;
      });
  }

  return (
    <div className="main">
      <div className="sub-main">
        <div>
          <div className="blog">
            <div className="container-images">
              <img src={profile} alt="profile" className="profile" />
            </div>
          </div>
          <div>
            <h1>Bloggs</h1>
            <div>
                <input
                    type="text"
                    placeholder=""
                    className="content comment-input" // add a class name to the element
                    maxLength={1000}
                    value={form.content}
                    onChange={(e) => updateForm({ content: e.target.value })}
                />
            </div>
            <div className="d-flex justify-content-center">
                <Card style={{ width: '18rem', margin: '1rem' }}>
                    <Card.Body>
                    <Card.Title>Initial</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Create, View</Card.Subtitle>
                    <Card.Text>
                        Contains all agents information and admin command.
                    </Card.Text>
                    <Card.Link href="">Go to Agent List</Card.Link>
                    </Card.Body>
                </Card>
                <Card style={{ width: '18rem', margin: '1rem' }}>
                    <Card.Body>
                    <Card.Title>Transaction Page</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Money</Card.Subtitle>
                    <Card.Text>
                        Contains all transaction information and admin command.
                    </Card.Text>
                    <Card.Link href="">Go to Transaction List</Card.Link>
                    </Card.Body>
                </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
