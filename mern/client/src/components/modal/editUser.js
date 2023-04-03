import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import "../css/Style.css";

const center = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};
const formStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "30px",
  borderRadius: "10px",
  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
};
const inputStyle = {
  width: "100%",
  padding: "12px 20px",
  margin: "8px 0",
  boxSizing: "border-box",
  borderRadius: "4px",
  border: "none",
  backgroundColor: "#F8F8F8",
};

export default function EditUser() {
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        birthday: "",
        password: "",
        occupation: "",
        location: "",
        auth_level: ""
    });
    const navigate = useNavigate();
    const params = useParams();
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    useEffect(() => {
        async function fetchData() {
          const id = params.id.toString();
          const response = await fetch(`http://localhost:5000/user/${params.id.toString()}`);
    
          if (!response.ok) {
            const message = `An error has occured: ${response.statusText}`;
            window.alert(message);
            return;
          }
    
          const responseJson = await response.json();
          responseJson.data.password ="";
          setForm(responseJson.data);
        }
    
        fetchData();
    
        return;
      }, [params.id, navigate]);

    async function onSubmit(e) {
        e.preventDefault();
        editUser();
        navigate("/");
    }

    async function editUser() {

        const editedPerson = {
            first_name: form.first_name,
            last_name: form.last_name,
            email: form.email,
            birthday: form.birthday,
            password: form.password,
            occupation: form.occupation,
            location: form.location,
            auth_level: form.auth_level,
        };
    
        // This will send a post request to update the data in the database.
        await fetch(`http://localhost:5000/user/edit/${params.id}`, {
          method: "PUT",
          body: JSON.stringify(editedPerson),
          headers: {
            'Content-Type': 'application/json'
          },
        });
    
        navigate("/user-manager");
    }

    return (
    <div style={center}>
        <form style={formStyle} onSubmit={onSubmit}>
        <h3>Edit User</h3>
        <input
            type="text"
            style={inputStyle}
            placeholder="First Name"
            value={form.first_name}
            onChange={(e) => updateForm({ first_name: e.target.value })}
        />
        <input
            type="text"
            style={inputStyle}
            placeholder="Last Name"
            value={form.last_name}
            onChange={(e) => updateForm({ last_name: e.target.value })}
        />
        <input
            type="text"
            style={inputStyle}
            placeholder="Email"
            value={form.email}
            onChange={(e) => updateForm({ email: e.target.value })}
        />
        <input
            type="date"
            style={inputStyle}
            placeholder="Birthday"
            value={form.birthday}
            onChange={(e) => updateForm({ birthday: e.target.value })}
        />
        <input
            type="password"
            style={inputStyle}
            placeholder="Password"
            value={form.password}
            onChange={(e) => updateForm({ password: e.target.value })}
        />
        <input
            type="text"
            style={inputStyle}
            placeholder="Occupation"
            value={form.occupation}
            onChange={(e) => updateForm({ occupation: e.target.value })}
        />
        <input
            type="text"
            style={inputStyle}
            placeholder="Location"
            value={form.location}
            onChange={(e) => updateForm({ location: e.target.value })}
        />
        <input
            type="text"
            style={inputStyle}
            placeholder="Authentication Level"
            value={form.auth_level}
            onChange={(e) => updateForm({ auth_level: e.target.value })}
        />
        <button type="submit">Edit</button>
        </form>
    </div>
    );
}