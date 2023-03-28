import React from "react";

export default function Modal(props) {
  const handleSubmit = (event) => {
    event.preventDefault(); // prevent form submission
    // TODO: Handle form submission here
    props.setShowModal(false); // close the modal after form submission
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={() => props.setShowModal(false)}>
          &times;
        </span>
        <h2>{props.title}</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" />

          <label htmlFor="content">Content:</label>
          <textarea id="content" name="content" rows="5"></textarea>

          <button type="submit">Post</button>
        </form>
      </div>
    </div>
  );
}