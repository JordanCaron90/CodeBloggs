import React from "react";
import './navbar.css';

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div id="navbar">
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
    </div>
  );
}
