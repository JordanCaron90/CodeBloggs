import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Navbar, Nav, Dropdown, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../assets/images/CodeBloggsgraphic.png';


export default function Header() {
  const [showModal, setShowModal] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postText, setPostText] = useState('');

  const handlePostSubmit = () => {
    // Implement post submission logic here
    console.log(`Title: ${postTitle}`);
    console.log(`Text: ${postText}`);
    setShowModal(false);
  };

  return (
    <>
      <Navbar bg="light" expand="lg" style={{ borderBottom: '2px solid #8d88ea' }}>
        <Navbar.Brand href="#home">
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Logo"
          />
          Codebloggs
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav>
            <Button style={{backgroundColor: "#8d88ea" }}variant="outline-primary" className="mr-2" onClick={() => setShowModal(true)}>
              Post
            </Button>
            <Dropdown>
              <Dropdown.Toggle variant="outline-primary" id="user-dropdown">
                User
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#account-settings">Account Settings</Dropdown.Item>
                <Dropdown.Item href="#logout">Log Out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Post a new article</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="postTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter title" value={postTitle} onChange={(e) => setPostTitle(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="postText">
              <Form.Label>Text</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter text" value={postText} onChange={(e) => setPostText(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handlePostSubmit}>
            Post
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
// export default function Headercomp() {
//   const [showModal, setShowModal] = useState(false);
//   const [userName, setUserName] = useState("User");
//   const [menuOpen, setMenuOpen] = useState(false);

//   const handlePostClick = () => {
//     setShowModal(true);
//   };

//   const handleUserNameClick = () => {
//     setMenuOpen(!menuOpen);
//   };

//   const handleAccountSettingsClick = () => {
//     // TODO: Handle account settings click
//   };

//   const handleLogoutClick = () => {
  //     // TODO: Handle logout click
//   };

//   return (
//     <header>
//       <div id="logo" className="header-left">
//         <div className="logo">
//           <img className="imagep" src={profile} alt="Logo" />
//         </div>
//       </div>
//       <div id="codebloggs" className="header-center">
//         <h1>CodeBloggs</h1>
//       </div>
//       <div id="post">
//         <div className="post-button-container">
//           <button onClick={handlePostClick}>Post</button>
//         </div>
//         <div id="dropdown" className="dropdown">
//           <button className="dropbtn" onClick={handleUserNameClick}>
//             {userName} &#9660;
//           </button>
//           {menuOpen && (
//             <div className="dropdown-content">
//               <a href="#" onClick={handleAccountSettingsClick}>
//                 Account Settings
//               </a>
//               <a href="#" onClick={handleLogoutClick}>
//                 Logout
//               </a>
//             </div>
//           )}
//         </div>
//       </div>

//       {showModal && (
//         <Modal title="New Post" setShowModal={setShowModal} />
//       )}
//     </header>
//   );
// }

// import React, { useState } from 'react';
// import Navbar from "./navbar";
// import "bootstrap/dist/css/bootstrap.css";
// import '../css/headercomp.css';
// import profile from "../../assets/images/CodeBloggsgraphic.png"
 


