import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import Login from "./components/login";
import Registration from "./components/registration";
import Homepage from "./components/homepage";
// import Loginn from "./components/test login/loginn";


const App = () => {
  return (

    <div>
        <Routes>
        <Route path="/" element={<Login />} />
          {/* <Route exact path="/RecordList" element={<RecordList />} /> */}
          {/* <Route path="/a" element={<Loginn />} /> */}
          <Route path="/registration" element={<Registration />} />
          <Route path="/homepage" element={<Homepage />} />
      
        </Routes>
    </div>
  );
};

export default App;
