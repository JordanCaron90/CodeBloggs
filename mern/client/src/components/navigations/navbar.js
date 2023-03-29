import React from "react";
import '../css/navbar.css';



// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";


import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Navbar() {
  return (
    <div className="navbar-container">
      <Nav className="flex-column bg-purple" style={{ borderRight: '2px solid #8d88ea' }}>
        <Nav.Item>
          <Nav.Link href="/home" className="pl-3" >Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/bloggs" className="pl-3" >Bloggs</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/network" className="pl-3" >Network</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/admin" className="pl-3" >Admin</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}


// export default function Navbar() {
//   return (
//     <div id="navbar">
//       <nav>
//         <ul>
//           <li>
//             <a href="/home">Home</a>
//           </li>
//           <li>
//             <a href="/bloggs">Bloggs</a>
//           </li>
//           <li>
//             <a href="/network">Network</a>
//           </li>
//           <li>
//             <a href="/admin">Admin</a>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// }




