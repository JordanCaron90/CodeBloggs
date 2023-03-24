import React, { useState } from 'react';
import Navbar from "./navbar";
import Headercomp from './headercomp';
// import Maincomp from './maincomp';
// import './navbar.css';
// import Dashboard from './shownavbar';
import App2 from '../app2';
import Carousel  from './carousel';


// homepage export

function Homepage() {
    return(
        <div>
             <Headercomp/>
            <div>
            <Navbar/>
            <div>
            {/* <Carousel/> */}
            </div>
            {/* <div>
             <Maincomp/>
            </div> */}
            </div>
             {/* <Dashboard/> */}
        </div>
    )
    
  }

export default Homepage;