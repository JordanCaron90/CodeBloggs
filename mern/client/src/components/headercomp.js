import React, { useState } from 'react';
import Navbar from "./navbar";
import "bootstrap/dist/css/bootstrap.css";
import './headercomp.css';
import profile from "../assets/images/CodeBloggsgraphic.png"



export default function Headercomp() {
    const [showModal, setShowModal] = useState(false);
    //   const [postTitle, setPostTitle] = useState('');
    //   const [postContent, setPostContent] = useState('');
    const [userName, setUserName] = useState('User');
    const [menuOpen, setMenuOpen] = useState(false);
    
    const handlePostClick = () => {
      setShowModal(true);
    };
    
    const handleUserNameClick = () => {
      setMenuOpen(!menuOpen);
    };
    
    const handleAccountSettingsClick = () => {
      // TODO: Handle account settings click
    };
    
    const handleLogoutClick = () => {
      // TODO: Handle logout click
    };
    return(
        
        <header>
        <div id="logo" className="header-left">
          <div className="logo">
            <img className='imagep' src={profile} alt="Logo" />
          </div>
        </div>
        <div id="codebloggs" className="header-center">
          <h1>CodeBloggs</h1>
        </div>
        <div id="post">
  <div className="post-button-container">
    <button onClick={handlePostClick}>Post</button>
  </div>
  <div id="dropdown" className="dropdown">
    <button className="dropbtn" onClick={handleUserNameClick}>
      {userName} &#9660;
    </button>
    {menuOpen && (
      <div className="dropdown-content">
        <a href="#" onClick={handleAccountSettingsClick}>Account Settings</a>
        <a href="#" onClick={handleLogoutClick}>Logout</a>
      </div>
    )}
  </div>
</div>

      </header>

)}     