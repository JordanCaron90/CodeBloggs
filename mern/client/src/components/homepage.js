import React, { useState } from 'react';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [userName, setUserName] = useState('John Doe');
  const [menuOpen, setMenuOpen] = useState(false);

  const handlePostClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handlePostTitleChange = (event) => {
    setPostTitle(event.target.value);
  };

  const handlePostContentChange = (event) => {
    setPostContent(event.target.value);
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

  return (
    <div className="App">
      <header>
        <div className="header-left">
          <div className="logo">
            <img src="../assets/images/CodeBloggs graphic.png" alt="Logo" />
          </div>
        </div>
        <div className="header-center">
          <h1>CodeBloggs</h1>
        </div>
        <div className="header-right">
          <button onClick={handlePostClick}>Post</button>
          <div className="dropdown">
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
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Post something</h2>
            <label htmlFor="post-title">Title:</label>
            <input type="text" id="post-title" value={postTitle} onChange={handlePostTitleChange} />
            <label htmlFor="post-content">Content:</label>
            <textarea id="post-content" value={postContent} onChange={handlePostContentChange} />
            <button onClick={handleModalClose}>Cancel</button>
            {/* <button onClick={handlePostSubmit}>Post</button> */}
          </div>
        </div>
      )}
      <nav>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Bloggs</a>
          </li>
          <li>
            <a href="#">Network</a>
          </li>
        </ul>
      </nav>
      <main>
        {/* Add your news feed component here */}
        hello world
      </main>
    </div>
  );
}

export default App;