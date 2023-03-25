import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import profile from "../assets/images/CodeBloggs graphic.png"
import "../Style.css";

export default function Create() {
  const [form, setForm] = useState({
    content: "",
    user_id: "641b9080615c564ad974bb84"
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

    await fetch("http://localhost:5000/post/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    })
      .then(() => {
        setForm({
          content: ""
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
            <div className="login-button">
              <button onClick={onSubmit}>Post</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
