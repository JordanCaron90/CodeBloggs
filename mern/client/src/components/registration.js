// import React, { useState } from "react";
// import { useNavigate } from "react-router";
// import '../Style.css'

// export default function Registration() {
//   const [form, setForm] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     birthday: "",
//     password: "",
//     occupation: "",
//     location: ""
//   });
//   const navigate = useNavigate();

//   // These methods will update the state properties.
//   function updateForm(value) {
//     return setForm((prev) => {
//       return { ...prev, ...value };
//     });
//   }

//   // This function will handle the submission.
//   async function onSubmit(e) {
//     e.preventDefault();

//     // When a post request is sent to the create url, we'll add a new record to the database.
//     const newPerson = { ...form };
//     console.log()
//     await fetch("http://localhost:5000/user/register", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newPerson),
//     })
//     .catch(error => {
//       window.alert(error);
//       return;
//     });

//     setForm({  first_name: "",
//     last_name: "",
//     email: "",
//     birthday: "",
//     password: "",
//     occupation: "",
//     location: "" });
//     navigate("/");
//   }

//   // This following section will display the form that takes the input from the user.
//   return (
//     <div>
//       <h3 style={center}>Create New User</h3>
//       <form onSubmit={onSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
//         <div className="form-group">
//           <label htmlFor="first_name">First Name</label>
//           <input
//             type="text"
//             className="form-control"
//             id="first_name"
//             value={form.first_name}
//             onChange={(e) => updateForm({ first_name: e.target.value })}
//             style={{ width: '100%', maxWidth: '400px', height: '2rem', padding: '0.5rem' }}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="last_name">Last Name</label>
//           <input
//             type="text"
//             className="form-control"
//             id="last_name"
//             value={form.last_name}
//             onChange={(e) => updateForm({ last_name: e.target.value })}
//             style={{ width: '100%', maxWidth: '400px', height: '2rem', padding: '0.5rem' }}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="email">Email</label>
//           <input
//             type="text"
//             className="form-control"
//             id="email"
//             value={form.email}
//             onChange={(e) => updateForm({ email: e.target.value })}
//             style={{ width: '100%', maxWidth: '400px', height: '2rem', padding: '0.5rem' }}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="birthday">Birthday</label>
//           <input
//             type="date"
//             className="form-control"
//             id="birthday"
//             value={form.birthday}
//             onChange={(e) => updateForm({ birthday: e.target.value })}
//             style={{ width: '100%', maxWidth: '400px', height: '2rem', padding: '0.5rem' }}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password</label>
//           <input
//             type="text"
//             className="form-control"
//             id="password"
//             value={form.password}
//             onChange={(e) => updateForm({ password: e.target.value })}
//             style={{ width: '100%', maxWidth: '400px', height: '2rem', padding: '0.5rem' }}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="occupation">Occupation</label>
//           <input
//             type="text"
//             className="form-control"
//             id="occupation"
//             value={form.occupation}
//             onChange={(e) => updateForm({ occupation: e.target.value })}
//             style={{ width: '100%', maxWidth: '400px', height: '2rem', padding: '0.5rem' }}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="location">Location</label>
//           <input
//             type="text"
//             className="form-control"
//             id="location"
//             value={form.location}
//             onChange={(e) => updateForm({ location: e.target.value })}
//             style={{ width: '100%', maxWidth: '400px', height: '2rem', padding: '0.5rem' }}
//           />
//         </div>
//         <div className="form-group">
//           <input
//             type="submit"
//             value="Create User"
//             className="btn btn-primary"
//           />
//         </div>
//       </form>
//     </div>
//   );
// }



import React, { useState } from "react";
import { useNavigate } from "react-router";
import "../Style.css";

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
  padding: "20px",
  borderRadius: "5px",
  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
};

const inputStyle = {
  width: "100%",
  padding: "12px 20px",
  margin: "8px 0",
  boxSizing: "border-box",
  borderRadius: "4px",
  border: "none",
  backgroundColor: "#f8f8f8",
};

export default function Registration() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    birthday: "",
    password: "",
    occupation: "",
    location: "",
  });
  const navigate = useNavigate();

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    const newPerson = { ...form };
    console.log();
    await fetch("http://localhost:5000/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({
      first_name: "",
      last_name: "",
      email: "",
      birthday: "",
      password: "",
      occupation: "",
      location: "",
    });
    navigate("/");
  }

  return (
    <div style={center}>
      <form style={formStyle} onSubmit={onSubmit}>
        <h3>Create New User</h3>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
